import type { User } from "@supabase/supabase-js";

export type SignUpDto = {
  email: string;
  username: string;
  password: string;
};

export type SignInDto = {
  username: string;
  password: string;
};

export type AuthUser = User & { new_email?: string | null };
