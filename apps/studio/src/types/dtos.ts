import { LinkKind } from "~/data/enums/index";

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
