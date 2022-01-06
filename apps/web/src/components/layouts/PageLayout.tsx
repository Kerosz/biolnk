import { CSSProperties, FC } from "react";
import { Theme, CSSstring } from "@biolnk/core";

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
