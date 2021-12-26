import { LinkKind } from "~/data/enums/db";

export type CreateLinkDto = {
  user_id: string;
  title: string;
  url: string;
  picture_url?: string;
  kind?: `${LinkKind}`;
};

export type UpdateLinkDto = Partial<Omit<CreateLinkDto, "user_id">> & {
  visible?: boolean;
  order?: number;
  total_clicks?: number;
};

export type FormLinkDto = {
  title: string;
  url: string;
  picture_url?: string;
};
