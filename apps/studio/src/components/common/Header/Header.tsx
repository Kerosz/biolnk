import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import Menu from "./Menu";
import Link from "../Link";
import { BaseIcon, Container, Text, Copy, Button, Flex } from "@biolnk/ui";
import { ctl } from "@biolnk/utils";

import Styles from "./Header.module.css";

const Header = () => {
  const rootClass = ctl(`
    ${Styles["blui-root"]}
  `);

  return (
    <header className={rootClass}>
      <Container className="flex items-center justify-between h-full">
        <Flex align="center">
          <Image
            src={Logo}
            height={36}
            width={22}
            alt="Biolnk.me branding"
            title="Biolnk.me branding"
          />
          <div className={`${Styles["blui-separator"]} rotate-[30deg]`} />

          <Link url="/chirila" variant="basic">
            <Text as="span" className={Styles["blui-page--text"]}>
              biolnk.me/chirila
            </Text>
          </Link>
          <Button variant="text" size="xs" title="Copy to clipboard">
            <BaseIcon
              aria-label="Copy to clipboard"
              icon={Copy}
              size="lg"
              stroke="hsl(336 73.7% 53.5%)"
            />
          </Button>
        </Flex>

        <Menu />
      </Container>
    </header>
  );
};

export default Header;
