import {
  LinkKind,
  PageLinkPosition,
  PageLinkPreference,
  PageIntegrations,
} from "@biolnk/core";

export type CreateLinkDto = {
  user_id: string;
  title: string;
  url: string;
  picture_url?: string;
  kind?: `${LinkKind}`;
};

export type UpdateLinkDto = Partial<Omit<CreateLinkDto, "user_id">> & {
  visible?: boolean;
  display_order?: number;
  total_clicks?: number;
};

export type FormLinkDto = {
  title: string;
  url: string;
  picture_url?: string;
};

export type ReorderLinkDto = {
  id: string;
  display_order: number;
};

export type UpdatePageDto = {
  theme?: string;
  title?: string;
  seo_title?: string;
  seo_description?: string;
  nsfw_content?: boolean;
  show_branding?: boolean;
  social_link_position?: `${PageLinkPosition}`;
  integrations?: PageIntegrations;
};

export type PageSeoDto = {
  seo_title: string;
  seo_description: string;
};

export type PageProfileDto = {
  title: string;
  biography: string;
};

export type StatsGADto = {
  google_analytics_id: string;
};

export type OnboardingDto = {
  full_name?: string;
  link_title?: string;
  link_url?: string;
  username?: string;
};

export type UpdateUserDto = {
  email?: string;
  username?: string;
  avatar_url?: string | null;
  biography?: string | null;
  full_name?: string | null;
  page_link?: `${PageLinkPreference}`;
  onboarding_process?: boolean;
};

export type AccountGeneralDto = {
  email: string;
  full_name: string;
  username: string;
};

export type ChangePasswordForm = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type ChangePasswordDto = Omit<ChangePasswordForm, "confirm_password">;
