import Image from "next/image";
import Link from "~components/common/Link";
import Logo from "~assets/images/biolnk.png";
import usePage from "~/utils/hooks/queries/usePage";
import useLinks from "~/utils/hooks/queries/useLinks";
import { memo } from "react";
import { useWindowSize, CSSstring, UserStatus } from "@biolnk/core";
import {
  Avatar,
  Flex,
  Heading,
  Loading,
  Text,
  Container,
  BaseIcon,
  VerifiedBadge,
} from "@biolnk/gamut";

import Styles from "./PhonePreview.module.css";

export type TextType = "title" | "bio" | "button";

const PhonePreview: React.FC = () => {
  const { page, isLoading } = usePage();
  const { links } = useLinks();
  const { width } = useWindowSize();

  const getTextStyles = (type: TextType) => {
    const fontSize =
      type === "title"
        ? { ...CSSstring(page?.theme.style.font.font_size_lead) }
        : type === "bio"
        ? { ...CSSstring(page?.theme.style.font.font_size_text) }
        : { ...CSSstring(page?.theme.style.font.font_size_button) };

    return {
      ...CSSstring(page?.theme.style.text.css),
      ...CSSstring(page?.theme.style.font.css),
      ...fontSize,
    };
  };

  const baseWidth = 1200;
  const scaleWidth = width > 1160 ? baseWidth : width;

  return (
    <aside className={Styles["blui-preview-root"]}>
      <div
        className={Styles["blui-preview-frame"]}
        style={{ transform: `scale(${scaleWidth / baseWidth})` }}
      >
        {page && !isLoading ? (
          <Container
            className={Styles["blui-preview-container"]}
            style={CSSstring(page.theme.style.background.css)}
            resetBaseStyle
          >
            <div>
              {page.user.avatar_url && (
                <Flex justify="center" className="pb-3.5">
                  <Image
                    src={page.user.avatar_url}
                    alt={page.title}
                    width={80}
                    height={80}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Flex>
              )}
              {page.title && (
                <Flex className="pb-3 items-center justify-center">
                  <Heading
                    as="h1"
                    style={getTextStyles("title")}
                    className="!font-medium text-center"
                  >
                    {page.title}
                  </Heading>
                  {page.user.status === UserStatus.VERIFIED && (
                    <BaseIcon
                      icon={VerifiedBadge}
                      fill="#0081f1"
                      size={21}
                      className="ml-0.5 mt-0.5"
                    />
                  )}
                </Flex>
              )}
              {page.user.biography && (
                <Text
                  as="p"
                  style={getTextStyles("bio")}
                  className="text-center !font-normal pb-2.5"
                >
                  {page.user.biography}
                </Text>
              )}

              {links && links.length > 0 ? (
                <div className="mt-6 mb-28">
                  {links
                    .filter((l) => l.visible !== false)
                    .map((l) => (
                      <Link
                        key={l.id}
                        url={l.url}
                        className={Styles["blui-preview-button"]}
                        style={CSSstring(page.theme.style.button.css)}
                        external
                        noIcon
                      >
                        <Text style={getTextStyles("button")}>{l.title}</Text>
                      </Link>
                    ))}
                </div>
              ) : null}
            </div>

            {page.show_branding && (
              // @ts-ignore
              <Flex as={Link} justify="center" className="mb-5" url="/">
                <Image
                  src={Logo}
                  height={49}
                  width={30}
                  alt="Biolnk.me branding"
                  title="Biolnk.me branding"
                />
              </Flex>
            )}
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    </aside>
  );
};

export default memo(PhonePreview);
