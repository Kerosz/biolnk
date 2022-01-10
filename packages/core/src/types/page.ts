import { ThemeStyle } from ".";

export type PageIntegrations = {
  google_analytics_id: string | null;
};

export type Page = {
  id: string;
  user_id: string;
  theme: string;
  title: string;
  subdomain: string;
  custom_domain: string;
  seo_title: string | null;
  seo_description: string | null;
  nsfw_content: boolean;
  show_branding: boolean;
  social_link_position: any;
  integrations: PageIntegrations;
  inserted_at: string;
  updated_at: string;
};

export type PageWithMetadata = {
  id: string;
  title: string;
  subdomain: string;
  custom_domain: string;
  seo_title: string | null;
  seo_description: string | null;
  nsfw_content: boolean;
  show_branding: boolean;
  social_link_position: "TOP" | "BOTTOM";
  integrations: PageIntegrations;
  theme: {
    id: string;
    name: string;
    kind: "SYSTEM" | "CUSTOM";
    state: "PUBLISHED" | "PRIVATE";
    style: ThemeStyle;
  };
  user: {
    id: string;
    email: string;
    username: string;
    avatar_url: string | null;
    biography: string | null;
    full_name: string | null;
    is_banned: boolean;
    page_link: "PATH" | "SUBDOMAIN" | "CUSTOM";
    status: "BASIC" | "VERIFIED";
  };
};
