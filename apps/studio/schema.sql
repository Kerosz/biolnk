create extension "uuid-ossp" with schema extensions;

/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create type public.user_status as enum ('basic', 'verified');
create type public.page_link_preference as enum ('path', 'subdomain', 'custom');

create table if not exists public.users (
  -- UUID from auth.users
  id uuid primary key references auth.users not null,
  email varchar(255) unique not null,
  username varchar(18) unique not null,
  full_name varchar(100),
  biography varchar(120),
  avatar_url text,
  status user_status default 'basic'::public.user_status,
  page_link page_link_preference default 'path'::public.page_link_preference,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint username_length check (char_length(username) >= 3)
);
alter table public.users enable row level security;
create unique index users_username_idx on public.users(username); 
create policy "Can view own user data." on public.users for select using (auth.uid() = id);
create policy "Can update own user data." on public.users for update using (auth.uid() = id);
comment on column public.users.status is 'Shows a checkmark on profile if the user is varified.';

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
* PAGES
* Note: This table contains page data. Users should only be able to update the table and the public
* should only have read-only access.
*/

create table if not exists public.pages (
  id uuid primary key default uuid_generate_v4(),
  -- UUID from public.users, cascading
  user_id uuid not null,
  seo_title varchar(55),
  seo_description varchar(180),
  nsfw_content boolean default false not null,
  show_branding boolean default true not null,
  theme varchar(30) default 'minimal' not null,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint user_id_page_key foreign key(user_id) references public.users(id) on delete cascade
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
  insert into public.pages (user_id)
  values (new.id);
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
create type public.link_kind as enum ('default', 'icon');

create table if not exists public.links (
  id uuid primary key default uuid_generate_v4(),
  -- UUID from public.users, cascading
  user_id uuid not null,
  title varchar(50) not null,
  url text not null,
  picture_url text,
  visible boolean default true not null,
  display_order int default 0,
  total_clicks int default 0,
  kind link_kind default 'default'::public.link_kind,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint user_id_link_key foreign key(user_id) references public.users(id) on delete cascade
);
alter table public.links enable row level security;
create unique index links_userId_idx on public.links(user_id);
create policy "Can view own link data." on public.links for select using (auth.uid() = user_id);
create policy "Can update own link data" on public.links for update using (auth.uid() = user_id);
create policy "Can insert when authenticated" on public.links for insert using (auth.role() = 'authenticated');

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