import React from "react";
import Image from "next/image";
import Icon from "~/components/ui/Icon";
import Logo from "~/assets/images/biolnk.png";
import { Button } from "~/components/ui/Button";
import { Facebook, Twitter } from "react-feather";

export interface SigningPageLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
  socialBtnText?: string;
}

const SigningPageLayout = ({
  children,
  title,
  subTitle,
  footer,
  socialBtnText,
}: SigningPageLayoutProps) => {
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
        <h1 className="text-normalTextHover text-xl font-semibold pb-2">
          {title}
        </h1>
        <p className="text-sm font-normal text-mauveDark-600 pb-6">
          {subTitle}
        </p>

        {/* Signing Form */}
        {children}

        {/* Divider */}
        <div className="border-b border-mauve-400 w-full flex justify-center mt-6 mb-11">
          <p className="transform translate-y-2.5 uppercase bg-white max-w-max px-4 text-sm text-mauve-800 font-normal select-none">
            or
          </p>
        </div>

        {/* Social Signing */}
        <div className="space-y-3.5">
          <Button size="md" block icon={<Icon icon={Twitter} fill="#1DA1F2" />}>
            {socialBtnText} With Twitter
          </Button>

          <Button
            size="md"
            block
            icon={<Icon icon={Facebook} fill="#4267B2" />}
          >
            {socialBtnText} With Facebook
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-lg max-w-[410px] w-full sm:px-8 px-4 py-5 mt-7 text-center">
        <span className="text-normalText tracking-wide">{footer}</span>
      </div>
    </section>
  );
};

export default SigningPageLayout;
