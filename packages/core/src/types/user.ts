export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  biography: string | null;
  full_name: string | null;
  status: "BASIC" | "VERIFIED";
  page_link: "PATH" | "SUBDOMAIN" | "CUSTOM";
  is_banned: boolean;
  onboarding_process: boolean;
  updated_at: string;
  inserted_at: string;
};
