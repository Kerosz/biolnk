import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import { NextSeo, NextSeoProps } from "next-seo";
import {
  Button,
  Heading,
  Text,
  Facebook,
  Twitter,
  Google,
} from "@biolnk/gamut";
import type { FC, ReactNode } from "react";

export interface CenteredPageLayoutProps {
  children?: ReactNode;
  title?: string;
  subTitle?: string;
  footer?: ReactNode;
  socialBtnText?: string;
  social?: boolean;
  twitterSigning?: () => Promise<void>;
  facebookSigning?: () => Promise<void>;
  googleSigning?: () => Promise<void>;
  seoOptions?: NextSeoProps;
}

const CenteredPageLayout: FC<CenteredPageLayoutProps> = ({
  children,
  title,
  subTitle,
  footer,
  socialBtnText,
  social = true,
  twitterSigning,
  facebookSigning,
  googleSigning,
  seoOptions,
}) => {
  return (
    <>
      {seoOptions && <NextSeo {...seoOptions} />}

      <main className="min-h-full flex flex-col items-center justify-center sm:py-11 py-7 px-3 sm:px-6 lg:px-8">
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
                  onClick={twitterSigning}
                >
                  {socialBtnText} With Twitter
                </Button>

                <Button
                  size="md"
                  block
                  icon={Facebook}
                  iconProps={{ fill: "#4267B2" }}
                  onClick={facebookSigning}
                >
                  {socialBtnText} With Facebook
                </Button>

                <Button
                  size="md"
                  block
                  icon={Google}
                  // iconProps={{ fill: "#4267B2" }}
                  onClick={googleSigning}
                >
                  {socialBtnText} With Google
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
      </main>
    </>
  );
};

CenteredPageLayout.displayName = "CenteredPageLayoutComponent";

export default CenteredPageLayout;
