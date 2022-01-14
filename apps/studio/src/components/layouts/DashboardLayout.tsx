import React from "react";
import Header from "~/components/common/Header/Header";
import { NextSeo, NextSeoProps } from "next-seo";
import { Container } from "@biolnk/gamut";
import { PhonePreview, PageNavigation } from "../dashboard/index";
import type { FC } from "react";

export interface DashboardLayoutProps {
  seoOptions?: NextSeoProps;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  seoOptions,
}) => {
  return (
    <>
      {seoOptions && <NextSeo {...seoOptions} />}

      <Header />
      <Container
        as="div"
        maxWidth="3xl"
        className="py-6 md:grid grid-cols-5 lg:gap-12 md:gap-3 relative"
      >
        <div className="col-span-3">
          <PageNavigation />
          {children}
        </div>

        <PhonePreview />
      </Container>
    </>
  );
};

export default DashboardLayout;
