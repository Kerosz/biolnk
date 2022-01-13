import Image from "next/image";
import Logo from "~assets/images/biolnk.png";
import Link from "../Link";
import {
  BaseIcon,
  Button,
  Container,
  Flex,
  Instagram,
  Linkedin,
  Text,
  Twitter,
} from "@biolnk/gamut";
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-mauve-50">
      <Container className="pt-12 pb-20">
        <Flex className="justify-between sm:flex-row flex-col">
          <Flex className="space-x-4 items-center sm:mb-0 mb-8">
            <Text className="!text-xl">Follow us</Text>
            <Link url="https://www.instagram.com/" noIcon>
              <BaseIcon icon={Instagram} size={26} />
            </Link>

            <Link url="https://twitter.com/" noIcon>
              <BaseIcon icon={Twitter} size={26} />
            </Link>

            <Link url="https://www.linkedin.com/" noIcon>
              <BaseIcon icon={Linkedin} size={26} />
            </Link>
          </Flex>

          <Flex>
            <Text variant="light" className="!text-xl mr-4">
              Made by{" "}
              <Link
                url="https://www.nectbox.com/"
                variant="hover"
                className="font-medium text-mauve-1000"
              >
                Nectbox.com
              </Link>
            </Text>

            <Text variant="light" className="!text-xl">
              Powered by{" "}
              <Link
                url="https://vercel.com/"
                variant="hover"
                className="font-medium text-mauve-1000"
              >
                Vercel
              </Link>
            </Text>
          </Flex>
        </Flex>

        <div className="w-full h-[1px] bg-mauve-700 my-8" />

        <Flex className="justify-between sm:items-start items-center sm:flex-row flex-col">
          <Flex className="sm:space-x-6 sm:flex-row flex-col sm:items-start items-center">
            <Link
              url="/"
              className="font-semibold text-3xl text-mauve-950 sm:mr-5 sm:mb-0 mb-5"
            >
              Biolnk
            </Link>

            <Link
              url="https://github.com/Kerosz/biolnk/issues"
              variant="hover"
              className="text-xl text-mauveDark-500"
              noIcon
            >
              Roadmap
            </Link>

            <Link
              url="https://github.com/Kerosz/biolnk/blob/main/LICENSE"
              variant="hover"
              className="text-xl text-mauveDark-500"
              noIcon
            >
              Licensing
            </Link>

            <Link
              url="/legal/privacy"
              variant="hover"
              className="text-xl text-mauveDark-500"
            >
              Privacy
            </Link>

            <Link
              url="/legal/terms"
              variant="hover"
              className="text-xl text-mauveDark-500"
            >
              Terms
            </Link>
          </Flex>

          <Text variant="light" className="!text-xl sm:mt-0 mt-8">
            Copyright © <span className="font-semibold">Biolnk</span>
          </Text>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
