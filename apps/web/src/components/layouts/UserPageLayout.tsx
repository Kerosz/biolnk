import { CSSstring, ThemeBackgroundStyle } from "@biolnk/core";
import { NextSeo, NextSeoProps } from "next-seo";
import type { FC } from "react";

export interface UserPageLayoutProps {
  backgroundCss: ThemeBackgroundStyle["css"];
  seoOptions?: NextSeoProps;
}

const UserPageLayout: FC<UserPageLayoutProps> = ({
  backgroundCss,
  seoOptions,
  children,
}) => {
  return (
    <>
      {seoOptions && <NextSeo {...seoOptions} />}

      <main style={CSSstring(backgroundCss)} className="min-h-screen">
        {children}
      </main>
    </>
  );
};

export default UserPageLayout;
