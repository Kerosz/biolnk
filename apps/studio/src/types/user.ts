import { PageLinkPreference, UserStatus } from "~/data/enums/db";

export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  biography: string | null;
  full_name: string | null;
  page_link: `${PageLinkPreference}`;
  status: `${UserStatus}`;
  updated_at: string;
  inserted_at: string;
};
