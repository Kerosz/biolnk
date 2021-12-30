import { LinkKind } from "~/data/enums/index";

export type EmbedType = "youtube" | "twitter";

export type LinkMetadata = {
  type: EmbedType;
  height: number;
  embed_url: string;
  optimized_thumbnail: string;
};

export type Link = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  thumbnail_url: string | null;
  visible: boolean;
  metadata: LinkMetadata | null;
  display_order: number;
  total_clicks: number;
  kind: `${LinkKind}`;
  inserted_at: string;
  updated_at: string;
};
