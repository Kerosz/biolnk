import { CSSProperties, FC } from "react";

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
  kind: any;
  state: any;
  inserted_at: string;
  updated_at: string;
};

function CSSstring(input: string): CSSProperties {
  const css_json = `{"${input
    .replace(/; /g, '", "')
    .replace(/: /g, '": "')
    .replace(";", "")}"}`;

  const obj = JSON.parse(css_json);

  const keyValues = Object.keys(obj).map((key) => {
    var camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
    return { [camelCased]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export interface PageLayoutProps {
  theme: Theme;
}

const PageLayout: FC<PageLayoutProps> = ({ theme }) => {
  console.log(theme);

  return (
    <main style={CSSstring(theme.style.background.css)} className="h-screen">
      main
    </main>
  );
};

export default PageLayout;
