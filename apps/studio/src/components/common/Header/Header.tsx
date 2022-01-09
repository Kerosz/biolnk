import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import Menu from "./Menu";
import Link from "../Link";
import useUser from "~/utils/hooks/queries/useUser";
import { memo } from "react";
import { useClipboard, getPageLink } from "@biolnk/core";
import { BaseIcon, Container, Text, Copy, Button, Flex } from "@biolnk/gamut";
import { Routes } from "~/data/enums";

import Styles from "./Header.module.css";

/**
 * @TODO Improve the way user loading happens in this component
 */
const Header = () => {
  const [_, handleCopy] = useClipboard();
  const { user } = useUser();

  const [pageLinkLabel, pageLinkUrl] = getPageLink(
    user?.username,
    user?.page_link
  );

  return (
    <header className={Styles["blui-root"]}>
      <Container className="flex items-center justify-between h-full">
        <Flex align="center">
          <Link url={Routes.DASHBOARD}>
            <Image
              src={Logo}
              height={36}
              width={22}
              alt="Biolnk.me branding"
              title="Biolnk.me branding"
            />
          </Link>
          <div className={`${Styles["blui-separator"]} rotate-[30deg]`} />

          <Link url={pageLinkUrl} variant="basic" external noIcon>
            <Text as="span" className={Styles["blui-page--text"]}>
              {pageLinkLabel}
            </Text>
          </Link>
          <Button
            variant="text"
            size="xs"
            title="Copy to clipboard"
            onClick={() => handleCopy(pageLinkUrl)}
          >
            <BaseIcon
              aria-label="Copy to clipboard"
              icon={Copy}
              size="lg"
              stroke="hsl(336 73.7% 53.5%)"
            />
          </Button>
        </Flex>

        <Menu user={user} pageLink={pageLinkUrl} />
      </Container>
    </header>
  );
};

export default memo(Header);
