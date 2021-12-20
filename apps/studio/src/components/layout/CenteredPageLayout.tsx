import * as React from "react";
import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import { Button, Heading, Text } from "@biolnk/ui";
import { Facebook, Twitter } from "react-feather";

export interface CenteredPageLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
  socialBtnText?: string;
  social?: boolean;
}

const CenteredPageLayout: React.FC<CenteredPageLayoutProps> = ({
  children,
  title,
  subTitle,
  footer,
  socialBtnText,
  social = true,
}) => {
  return (
    <section className="min-h-full flex flex-col items-center justify-center sm:py-11 py-7 px-3 sm:px-6 lg:px-8">
      <Image
        src={Logo}
        height={85}
        width={52}
        placeholder="blur"
        alt="Biolnk.me branding"
      />
      <div className="bg-white rounded-lg max-w-[410px] w-full sm:px-8 px-4 py-6 mt-6">
        {/* Header */}
        <Heading as="h1" className="font-semibold pb-2">
          {title}
        </Heading>
        <Text as="span" size="sm" variant="gray" className="pb-6">
          {subTitle}
        </Text>

        {/* Signing Form */}
        {children}

        {social && (
          <>
            {/* Divider */}
            <div className="border-b border-mauve-400 w-full flex justify-center mt-6 mb-11">
              <span className="transform translate-y-2.5 uppercase bg-white max-w-max px-4 text-sm text-mauve-800 font-normal select-none">
                or
              </span>
            </div>

            {/* Social Signing */}
            <div className="space-y-3.5">
              <Button
                size="md"
                block
                icon={Twitter}
                iconProps={{ fill: "#1DA1F2" }}
              >
                {socialBtnText} With Twitter
              </Button>

              <Button
                size="md"
                block
                icon={Facebook}
                iconProps={{ fill: "#4267B2" }}
              >
                {socialBtnText} With Facebook
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="bg-white rounded-lg max-w-[410px] w-full sm:px-8 px-4 py-5 mt-7 text-center">
          <Text as="span" variant="light" spacing="wide">
            {footer}
          </Text>
        </div>
      )}
    </section>
  );
};

CenteredPageLayout.displayName = "CenteredPageLayoutComponent";

export default CenteredPageLayout;
