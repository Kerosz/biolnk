import { PageLinkPreference, UserStatus } from "~/data/enums/db";

export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  biography: string | null;
  full_name: string | null;
  status: `${UserStatus}`;
  page_link: `${PageLinkPreference}`;
  is_banned: boolean;
  updated_at: string;
  inserted_at: string;
};

export type ChangePasswordForm = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
