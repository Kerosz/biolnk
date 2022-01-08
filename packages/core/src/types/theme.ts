export type ThemeFontStyle = {
  css: string;
  font_size_lead: string;
  font_size_text: string;
  font_size_button: string;
};

export type ThemeButtonStyle = {
  css: string;
};

export type ThemeBackgroundStyle = {
  css: string;
};

export type ThemeTextStyle = {
  css: string;
};

export type ThemeStyle = {
  css?: string;
  font?: ThemeFontStyle;
  button: ThemeButtonStyle;
  background: ThemeBackgroundStyle;
  text: ThemeTextStyle;
};

export type Theme = {
  id: string;
  name: string;
  style: ThemeStyle;
  kind: "SYSTEM" | "CUSTOM";
  state: "PUBLISHED" | "PRIVATE";
  inserted_at: string;
  updated_at: string;
};
