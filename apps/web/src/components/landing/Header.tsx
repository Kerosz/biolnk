import Image from "next/image";
import Logo from "~assets/images/biolnk.png";
import Link from "../Link";
import { Button, Container, Flex, User } from "@biolnk/gamut";
import type { FC } from "react";

const Header: FC = () => {
  return (
    <header className="h-[90px] sticky top-0 bg-mauveAlpha-1000 z-40 border-b border-mauve-300">
      <Container as="div" className="flex justify-between items-center h-full">
        <Link url="/" className="h-fit">
          <Image
            src={Logo}
            height={44}
            width={25}
            alt="Biolnk.me branding"
            title="Biolnk.me branding"
            priority
          />
        </Link>

        <Flex className="space-x-2.5">
          <Button
            // @ts-ignore
            as={Link}
            url="https://app.biolnk.me/signup"
            target="same"
            size="lg"
            variant="secondary"
            noIcon
          >
            Get Started
          </Button>
          <Button
            // @ts-ignore
            as={Link}
            url="https://app.biolnk.me/signin"
            target="same"
            size="lg"
            icon={User}
            iconProps={{ size: 23 }}
            variant="outline"
            aria-label="Signin"
            noIcon
          />
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
