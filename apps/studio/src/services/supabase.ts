import { sbClient } from "~/lib/supabase/index";
import type { SignUpDto } from "~/types";

export const getUserByUsername = async (username: string) => {
  const { data, error } = await sbClient
    .from("users")
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
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) {
    return null;
  }

  return data;
};

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
