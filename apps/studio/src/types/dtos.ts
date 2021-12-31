import {
  LinkKind,
  PageLinkPosition,
  PageLinkPreference,
} from "~/data/enums/index";

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
};

export type PageSeoDto = {
  seo_title: string;
  seo_description: string;
};

export type PageProfileDto = {
  title: string;
  biography: string;
};

export type UpdateUserDto = {
  email?: string;
  username?: string;
  avatar_url?: string | null;
  biography?: string | null;
  full_name?: string | null;
  page_link?: `${PageLinkPreference}`;
};
