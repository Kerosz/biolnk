import {
  PageLinkPosition,
  PageLinkPreference,
  ThemeKind,
  ThemeState,
  UserStatus,
} from "~/data/enums";

export type PageWithMetadata = {
  id: string;
  title: string;
  nsfw_content: boolean;
  seo_description: string | null;
  seo_title: string | null;
  show_branding: boolean;
  social_link_position: `${PageLinkPosition}`;
  theme: {
    id: string;
    name: string;
    kind: `${ThemeKind}`;
    state: `${ThemeState}`;
  };
  user: {
    id: string;
    email: string;
    username: string;
    avatar_url: string | null;
    biography: string | null;
    full_name: string | null;
    is_banned: boolean;
    page_link: `${PageLinkPreference}`;
    status: `${UserStatus}`;
  };
};

export type Page = {
  id: string;
  user_id: string;
  theme: string;
  title: string;
  seo_title: string | null;
  seo_description: string | null;
  nsfw_content: boolean;
  show_branding: boolean;
  social_link_position: `${PageLinkPosition}`;
  inserted_at: string;
  updated_at: string;
};
