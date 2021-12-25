import { LinkKind } from "~/data/enums/db";

export type Link = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  picture_url: string | null;
  visible: boolean;
  order: number;
  total_clicks: number;
  kind: `${LinkKind}`;
  inserted_at: string;
  updated_at: string;
};
