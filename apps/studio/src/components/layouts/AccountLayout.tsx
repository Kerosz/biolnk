import SideNavigation from "../account/SideNavigation";
import Header from "../common/Header/Header";
import { FC } from "react";
import { Container } from "@biolnk/ui";

const AccountLayout: FC = ({ children }) => {
  return (
    <>
      <Header />

      <Container as="main" maxWidth="lg" className="flex py-12">
        <SideNavigation />

        <div className="pl-8 w-full">{children}</div>
      </Container>
    </>
  );
};

export default AccountLayout;
