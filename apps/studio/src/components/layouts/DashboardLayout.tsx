import React from "react";
import Header from "~/components/common/Header/Header";
import PreviewEmbed from "../dashboard/PreviewEmbed/PreviewEmbed";
import PageNavigation from "../dashboard/PageNavigation";
import { Container } from "@biolnk/ui";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as="main"
        maxWidth="3xl"
        className="py-8 md:grid grid-cols-5 lg:gap-12 md:gap-3 relative"
      >
        <div className="col-span-3">
          <PageNavigation />
          {children}
        </div>

        <PreviewEmbed />
      </Container>
    </>
  );
};

export default DashboardLayout;
