import { ThemeKind, ThemeState } from "~/data/enums";

export type ThemeFontStyle = {
  key: string;
  font_weight: number;
  font_size: string;
  font_size_lead: string;
  font_type: string;
};

export type ThemeButtonStyle = {
  css: string;
};

export type ThemeBackgroundStyle = {
  css: string;
};

export type ThemeStyle = {
  css?: string;
  font?: ThemeFontStyle;
  button: ThemeButtonStyle;
  background: ThemeBackgroundStyle;
};

export type Theme = {
  id: string;
  name: string;
  style: ThemeStyle;
  kind: `${ThemeKind}`;
  state: `${ThemeState}`;
  inserted_at: string;
  updated_at: string;
};
