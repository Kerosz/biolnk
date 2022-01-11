import Image from "next/image";
import Logo from "~/assets/images/biolnk.png";
import { NextSeo, NextSeoProps } from "next-seo";
import { Heading, Text } from "@biolnk/gamut";
import type { FC, ReactNode } from "react";

export interface SimplePageLayoutProps {
  title: string;
  children?: ReactNode;
  seoOptions?: NextSeoProps;
}

const SimplePageLayout: FC<SimplePageLayoutProps> = ({
  children,
  title,
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
        <div className="bg-white rounded-lg max-w-md w-full px-4 sm:px-6 py-6 mt-6">
          {/* Header */}
          <Heading as="h1" className="font-semibold pb-7">
            {title}
          </Heading>

          {/* Content */}
          {children}
        </div>
      </main>
    </>
  );
};

SimplePageLayout.displayName = "SimplePageLayoutComponent";

export default SimplePageLayout;
