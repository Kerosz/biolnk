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

export const createUserWithEmailAndPassword = async (u: SignUpDto) => {
  const { user: authUser, error: authError } = await sbClient.auth.signUp({
    email: u.email,
    password: u.password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const { data, error } = await sbClient
    .from("users")
    .insert({
      id: authUser.id,
      email: authUser.email,
      username: u.username,
    })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
