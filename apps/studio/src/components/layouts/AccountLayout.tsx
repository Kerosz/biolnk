import SideNavigation from "../account/SideNavigation";
import Header from "../common/Header/Header";
import { FC } from "react";
import { Container } from "@biolnk/gamut";

const AccountLayout: FC = ({ children }) => {
  return (
    <>
      <Header />

      <Container
        as="main"
        maxWidth="lg"
        className="flex flex-col sm:flex-row pb-12"
      >
        <SideNavigation />

        <div className="sm:pl-3.5 md:pl-6 lg:pl-8 w-full pt-2 sm:pt-12">
          {children}
        </div>
      </Container>
    </>
  );
};

export default AccountLayout;
