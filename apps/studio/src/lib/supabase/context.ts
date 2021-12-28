import { createContext, useContext } from "react";
import { isUndefined } from "@biolnk/utils";
import { Session } from "@supabase/supabase-js";
import { SignInDto, SignUpDto, User, AuthUser } from "~/types";

export type SupabaseContextState = {
  user: User;
  authUser: AuthUser;
  session: Session;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  signUpWithEmail: (signUpDto: SignUpDto) => Promise<void>;
  signInWithEmail: (signInDto: SignInDto) => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextState | undefined>(
  undefined
);

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);

  if (isUndefined(ctx)) {
    throw new Error("Supabase must be used within the 'SupabaseProvider'");
  }

  return ctx;
};
