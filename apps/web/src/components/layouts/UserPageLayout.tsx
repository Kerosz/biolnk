import { CSSstring, ThemeBackgroundStyle, ThemeStyle } from "@biolnk/core";
import { Container } from "@biolnk/gamut";
import type { FC } from "react";

export interface UserPageLayoutProps {
  backgroundCss: ThemeBackgroundStyle["css"];
}

const UserPageLayout: FC<UserPageLayoutProps> = ({
  backgroundCss,
  children,
}) => {
  return (
    <main style={CSSstring(backgroundCss)} className="min-h-screen">
      {children}
    </main>
  );
};

export default UserPageLayout;
