import React from "react";
import Header from "~/components/common/Header/Header";
import PreviewEmbed from "../PreviewEmbed";
import PageNavigation from "../PageNavigation";
import { Container } from "@biolnk/ui";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as="section"
        maxWidth="3xl"
        className="py-10 grid grid-cols-5 gap-12"
      >
        <div className="col-span-3 px-3">
          <PageNavigation />
          {children}
        </div>

        <PreviewEmbed />
      </Container>
    </>
  );
};

export default DashboardLayout;
