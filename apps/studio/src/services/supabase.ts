import { sbClient } from "~/lib/supabase/index";
import type { CreateLinkDto, Link, SignUpDto, User } from "~/types";

export const getUserByUsername = async (username: string) => {
  const { data, error } = await sbClient
    .from<User>("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!data || error) {
    return null;
  }

  return data;
};

export const getUserById = async (id: string) => {
  const { data, error } = await sbClient
    .from<User>("users")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("User record not found");
    }

  return data;
};

export const getLinksByUserId = async (id: string) => {
  const {data, error} = await sbClient.from<Link>("links").select("*").eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No link record found");
  }

  return data;
}

export const createUserWithEmailAndPassword = async ({
  email,
  password,
  username,
}: SignUpDto) => {
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

export const createNewLink = async (newLink: CreateLinkDto) => {
  const {data, error} = await sbClient.from<Link>("links").upsert(newLink).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
