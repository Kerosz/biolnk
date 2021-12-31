import { sbClient } from "~/lib/supabase/index";
import { Tables, CustomFunction } from "~/data/enums/index";
import {
  CreateLinkDto,
  Link,
  Page,
  PageWithMetadata,
  ReorderLinkDto,
  SignUpDto,
  UpdateLinkDto,
  UpdatePageDto,
  UpdateUserDto,
  User,
} from "~/types";

/****************************************************
 *             USER CRUD OPERATIONS                 *
 ****************************************************/

export const getUserByUsername = async (username: string) => {
  const { data, error } = await sbClient
    .from<User>(Tables.USERS)
    .select("*")
    .eq("username", username)
    .single();

  if (!data || error) {
    throw new Error("User record not found");
  }

  return data;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await sbClient
    .from<User>(Tables.USERS)
    .select("*")
    .eq("id", userId)
    .single();

  if (!data || error) {
    throw new Error("User record not found");
  }

  return data;
};

export const createUserWithEmailAndPassword = async ({
  email,
  password,
  username,
}: SignUpDto) => {
  /**
   * We need to make these 2 separate calls as supabase doesn't
   * check before auth if any credentials already exist
   */
  // START CHECKS
  const { data: usernameExists } = await sbClient
    .from<User>(Tables.USERS)
    .select("*")
    .eq("username", username)
    .single();

  if (usernameExists) {
    throw new Error("Username already in use!");
  }

  const { data: emailExists } = await sbClient
    .from<User>(Tables.USERS)
    .select("*")
    .eq("email", email)
    .single();

  if (emailExists) {
    throw new Error("Email address already in use!");
  }
  // END CHECKS

  const { user, error } = await sbClient.auth.signUp(
    { email, password },
    {
      // additional metadata needed to auto create a new user entry
      // on auth ( new.raw_user_meta_data->>'username' )
      data: { username },
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const updateUser = async (userDto: UpdateUserDto, userId: string) => {
  const { data, error } = await sbClient
    .from<User>(Tables.USERS)
    .update(userDto)
    .match({ id: userId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/****************************************************
 *             LINK CRUD OPERATIONS                 *
 ****************************************************/

export const createNewLink = async (newLink: CreateLinkDto) => {
  const { data, error } = await sbClient
    .from<Link>(Tables.LINKS)
    .upsert(newLink)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getLinksByUserId = async (id: string) => {
  const { data, error } = await sbClient
    .from<Link>(Tables.LINKS)
    .select("*")
    .eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No link record found");
  }

  return data;
};

export const updateLink = async (linkDto: UpdateLinkDto, linkId: string) => {
  const { data, error } = await sbClient
    .from<Link>(Tables.LINKS)
    .update(linkDto)
    .match({ id: linkId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const reorderLinks = async (listDto: ReorderLinkDto[]) => {
  const { data, error } = await sbClient.rpc(CustomFunction.REORDER, {
    payload: listDto,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteLink = async (linkId: string) => {
  const { data, error } = await sbClient
    .from<Link>(Tables.LINKS)
    .delete()
    .eq("id", linkId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/****************************************************
 *             PAGE CRUD OPERATIONS                 *
 ****************************************************/

export const getPageWithMetadata = async (
  userId: string
): Promise<PageWithMetadata> => {
  const { data, error } = await sbClient
    .from(Tables.PAGES)
    .select(
      `
      id,
      title,
      seo_title,
      seo_description,
      nsfw_content,
      show_branding,
      social_link_position,
      user:users(
        id,
        username,
        email,
        avatar_url,
        full_name,
        biography,
        status,
        page_link,
        is_banned
      ),
      theme:themes(
        id,
        style,
        name,
        kind,
        state
      )
    `
    )
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updatePage = async (pageDto: UpdatePageDto, userId: string) => {
  const { data, error } = await sbClient
    .from<Page>(Tables.PAGES)
    .update(pageDto)
    .match({ user_id: userId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
