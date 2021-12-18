import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import { BaseIcon, Container, Text, Copy, Button } from "@biolnk/ui";
import { ctl } from "@biolnk/utils";

import Styles from "./Header.module.css";
import Link from "../Link";

const Header = () => {
  const rootClass = ctl(`
    ${Styles["blui-root"]}
  `);

  return (
    <header className={rootClass}>
      <Container className="flex items-center h-full">
        <Image
          src={Logo}
          height={36}
          width={22}
          placeholder="blur"
          alt="Biolnk.me branding"
          title="Biolnk.me branding"
        />
        <div className={`${Styles["blui-separator"]} rotate-[30deg]`} />
        <div className="flex items-center">
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
        </div>
      </Container>
    </header>
  );
};

export default Header;