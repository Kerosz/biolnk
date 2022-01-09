import Image from "next/image";
import Link from "../Link";
import Logo from "~assets/images/biolnk.png";
import { Flex, Heading, Text, Container } from "@biolnk/gamut";
import { CSSstring, Link as LinkType, ThemeStyle } from "@biolnk/core";
import type { FC } from "react";

export interface PageContentProps {
  avatar: string;
  title: string;
  bio: string;
  links: LinkType[];
  style: ThemeStyle;
}

export type TextType = "title" | "bio" | "button";

const PageContent: FC<PageContentProps> = ({
  avatar,
  title,
  bio,
  links,
  style,
}) => {
  const getTextStyles = (type: TextType) => {
    const fontSize =
      type === "title"
        ? { ...CSSstring(style.font.font_size_lead) }
        : type === "bio"
        ? { ...CSSstring(style.font.font_size_text) }
        : { ...CSSstring(style.font.font_size_button) };

    return {
      ...CSSstring(style.text.css),
      ...CSSstring(style.font.css),
      ...fontSize,
    };
  };

  return (
    <Container className="!max-w-screen-md pt-14 min-h-screen z-10 flex flex-col justify-between">
      <div>
        {avatar && (
          <Flex justify="center" className="pb-3.5">
            <Image
              src={avatar}
              alt={title}
              priority
              width={80}
              height={80}
              className="rounded-full border border-mauve-400"
            />
          </Flex>
        )}

        {title && (
          <Heading
            as="h1"
            style={getTextStyles("title")}
            className="!font-medium text-center pb-3"
          >
            {title}
          </Heading>
        )}

        {bio && (
          <Text
            as="p"
            style={getTextStyles("bio")}
            className="text-center !font-normal pb-2.5"
          >
            {bio}
          </Text>
        )}

        {links.length > 0 ? (
          <div className="mt-6 mb-28">
            {links
              .filter((l) => l.visible !== false)
              .map((l) => (
                <Link
                  key={l.id}
                  url={l.url}
                  className="mb-4 last:mb-0 h-14 w-full flex justify-center transform-gpu animate-decelerate hover:scale-[1.03]"
                  style={CSSstring(style.button.css)}
                  external
                  noIcon
                >
                  <Text style={getTextStyles("button")}>{l.title}</Text>
                </Link>
              ))}
          </div>
        ) : null}
      </div>

      {/* @ts-ignore */}
      <Flex as={Link} justify="center" className="mb-5" url="/">
        <Image
          src={Logo}
          height={49}
          width={30}
          alt="Biolnk.me branding"
          title="Biolnk.me branding"
        />
      </Flex>
    </Container>
  );
};

export default PageContent;
