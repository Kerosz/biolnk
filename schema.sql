-- create extension "uuid-ossp" with schema extensions;

/** 
* USERS
* Note: This table contains user data. Users should only be able to update their own data.
*/
create type public.user_status as enum ('BASIC', 'VERIFIED');
create type public.page_link_preference as enum ('PATH', 'SUBDOMAIN', 'CUSTOM');

create table if not exists public.users (
  -- UUID from auth.users
  id uuid primary key references auth.users on delete cascade,
  email varchar(255) unique not null,
  username varchar(18) unique not null,
  full_name varchar(100),
  biography varchar(120),
  avatar_url text,
  status user_status default 'BASIC'::public.user_status,
  page_link page_link_preference default 'PATH'::public.page_link_preference,
  is_banned boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint username_length check (char_length(username) >= 3)
);
alter table public.users enable row level security;
create policy "Allow public read-only access." on public.users for select using (true);
create policy "Can update own user data." on public.users for update using (auth.uid() = id);
create unique index users_username_idx on public.users(username); 

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, username, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
* This trigger automatically updates `public.users.email` when a user changes his 
* email via Supabase Auth.
*/ 
create or replace function public.handle_email_update()
returns trigger as $$
begin
  update public.users set email = new.email
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_email_change
  after update on auth.users
  for each row when (old.email is distinct from new.email)
  execute procedure public.handle_email_update();

/**
* This fn checks the current password of an auth.user before updating the new password. The fn
* is required because Supabase Auth API doesn't provide a way to know what the current password
* of a user is. Used with `supabaseClient.rpc()`
*/ 
create or replace function change_user_password(current_plain_password varchar, new_plain_password varchar)
returns json
language plpgsql
security definer
as $$
DECLARE
_uid uuid; -- for checking 'User is not found'
user_id uuid; -- to store the user id from the request
BEGIN
  -- not empty
  IF (new_plain_password = '') IS NOT FALSE THEN
    RAISE EXCEPTION 'New password is empty!';
  -- minimum 8 chars
  ELSIF char_length(new_plain_password) < 8 THEN
    RAISE EXCEPTION 'New password must be at least 8 characters long!';
  -- maximum 8 chars
  ELSIF char_length(new_plain_password) > 40 THEN
    RAISE EXCEPTION 'New password must be at most 40 characters long!';
  END IF;
  
  -- Get user by his current auth.uid and current password
  user_id := auth.uid();
  SELECT id INTO _uid
  FROM auth.users
  WHERE id = user_id
  AND encrypted_password =
  crypt(current_plain_password::text, auth.users.encrypted_password);

  -- Check the currect password
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Old password is incorrect!';
  END IF;

  -- Then set the new password
  UPDATE auth.users SET 
  encrypted_password =
  crypt(new_plain_password, gen_salt('bf'))
  WHERE id = user_id;
  
  RETURN '{"data":true}';
END;
$$

/**
* This function deletes the current user and all it's data by cascading
* to all the tables that references `auth.users.id`
*/ 
create or replace function delete_user_account() returns void as $$
  delete from auth.users where id = auth.uid();
$$ language plpgsql security definer;

/** 
* Themes
* Note: This table contains page themes. Users should only be able to view.
*/
create type public.theme_kind as enum ('SYSTEM', 'CUSTOM');
create type public.theme_state as enum ('PUBLISHED', 'PRIVATE');

create table if not exists public.themes (
  id uuid primary key default uuid_generate_v4(),
  name varchar(50) unique not null,
  style jsonb not null,
  kind theme_kind default 'SYSTEM'::public.theme_kind,
  state theme_state default 'PUBLISHED'::public.theme_state,
  owner uuid,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint owner_theme_key foreign key(owner) references public.users(id) on delete cascade
);
alter table public.themes enable row level security;
create policy "Allow public read-only access." on public.themes for select using (true);
create policy "Can insert when authenticated." on public.themes for insert with check (auth.role() = 'authenticated');


/** 
* PAGES
* Note: This table contains page data. Users should only be able to update the table and the public
* should only have read-only access.
*/

create type public.page_link_position as enum ('BOTTOM', 'TOP');

create table if not exists public.pages (
  id uuid primary key default uuid_generate_v4(),
  -- UUID from public.users, cascading
  user_id uuid not null,
  theme varchar(50) default 'Cirrus'::text,
  title varchar(60),
  seo_title varchar(55),
  seo_description varchar(180),
  nsfw_content boolean default false not null,
  show_branding boolean default true not null,
  social_link_position page_link_position default 'TOP'::public.page_link_position,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint user_id_page_key foreign key(user_id) references public.users(id) on delete cascade,
  constraint theme_page_key foreign key(theme) references public.themes(name) on delete set null
);
alter table public.pages enable row level security;
create policy "Allow public read-only access." on public.pages for select using (true);
create policy "Can update own page data." on public.pages for update using (auth.uid() = user_id);

/**
* This trigger automatically creates a page entry when a new user is created in public.users
*/ 
create or replace function public.handle_new_page() 
returns trigger as $$
begin
  insert into public.pages (user_id, title)
  values (new.id, new.username);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_public_user_insert
  after insert on public.users
  for each row execute procedure public.handle_new_page();

/** 
* Links
* Note: This table contains page links. Users should only be able to view and update their own links.
*/
create type public.link_kind as enum ('LINK', 'EMBED');

create table if not exists public.links (
  id uuid primary key default uuid_generate_v4(),
  -- UUID from public.users, cascading
  user_id uuid not null,
  title varchar(50) not null,
  url text not null,
  thumbnail_url text,
  visible boolean default true not null,
  metadata jsonb,
  display_order int default 9999,
  total_clicks int default 0,
  kind link_kind default 'LINK'::public.link_kind,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint user_id_link_key foreign key(user_id) references public.users(id) on delete cascade
);
alter table public.links enable row level security;
create unique index links_userId_idx on public.links(user_id);
create policy "Allow public read-only access." on public.links for select using (true);
create policy "Can update own link data" on public.links for update using (auth.uid() = user_id);
create policy "Can insert when authenticated" on public.links for insert with check (auth.role() = 'authenticated');

/**
* Updates all rows order according to the passed in JSON. Wraps update...from syntax
*/ 
create or replace function update_links_order(payload json) returns setof public.links as $$
  update public.links as l set display_order = x.display_order
  from (
    select id, display_order from json_populate_recordset(null::public.links, payload)
  ) as x
  where l.id = x.id
  returning l.*;
$$ language sql;

/** 
* Default Inserts
* Note: Following section contains default inserts for the DB
*/
insert into public.themes (name, kind, state, style)
values
    ('Cirrus', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: hsl(300 20.0% 99.0%); border-width: 0px; border-color: hsl(300 20.0% 99.0%); border-radius: 9999px; box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1), inset 0px 0px 2px 1px rgba(24, 39, 75, 0.05);"},"background":{"css":"background-color: hsl(300 20.0% 99.0%);"}}'),
    ('Minimal Blue', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: transparent; border-width: 2px; border-color: hsl(252 4.0% 57.3%); border-radius: 9999px;"},"background":{"css":"background-color: hsl(209 95.0% 90.1%);"}}'),
    ('Minimal Green', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: transparent; border-width: 2px; border-color: hsl(252 4.0% 57.3%); border-radius: 9999px;"},"background":{"css":"background-color: hsl(122 42.6% 86.5%);"}}'),
    ('Minimal Orange', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: transparent; border-width: 2px; border-color: hsl(252 4.0% 57.3%); border-radius: 9999px;"},"background":{"css":"background-color: hsl(25 100% 88.2%);"}}'),
    ('Carbon', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: hsl(243 4.9% 18.8%); border-width: 1px; border-color: hsl(245 4.9% 25.4%); border-radius: 6px;"},"background":{"css":"background-color: hsl(240 5.1% 11.6%);"}}'),
    ('Retro', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: hsl(25, 100%, 95%); border-width: 2px; border-color: hsl(228, 49%, 13%); border-radius: 0px;"},"background":{"css":"background-color: hsl(25, 100%, 95%);"}}'),
    ('New York', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: transparent; border-width: 2px; border-color: hsl(300 20.0% 99.0%); border-radius: 0px;"},"background":{"css":"background: hsla(347, 92%, 85%, 1) linear-gradient(0deg, hsla(347, 92%, 85%, 1) 0%, hsla(251, 82%, 70%, 1) 100%);"}}'),
    ('Cypher', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: transparent; border-width: 2px; border-color: hsl(300 20.0% 99.0%); border-radius: 0px;"},"background":{"css":"background: hsla(192, 80%, 51%, 1) linear-gradient(180deg, hsla(192, 80%, 51%, 1) 0%, hsla(355, 85%, 63%, 1) 100%);"}}'),
    ('Polymorph', 'SYSTEM', 'PUBLISHED', '{"button":{"css":"background-color: rgba(196, 196, 196, 0.01); border-width: 0px; border-color: hsl(300 20.0% 99.0%); border-radius: 9999px; box-shadow: inset 0px 17.7895px 25.5438px -16.421px rgba(255, 255, 255, 0.2), inset 0px -5.92982px 4.10526px -6.38596px rgba(255, 255, 255, 0.3), inset 0px 3.19298px 5.01754px -1.82456px #FFFFFF, inset 0px -37.4035px 31.0175px -29.193px rgba(96, 68, 145, 0.3), inset 0px 44.7017px 45.614px -21.8947px rgba(202, 172, 255, 0.14), inset 0px 1.82456px 8.21052px rgba(154, 146, 210, 0.3), inset 0px 0.45614px 18.2456px rgba(227, 222, 255, 0.12);"},"background":{"css":"background: hsla(202, 98%, 20%, 1) linear-gradient(180deg, hsla(202, 98%, 20%, 1) 0%, hsla(176, 30%, 56%, 1) 100%);"}}');