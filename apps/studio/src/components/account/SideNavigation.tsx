import Link from "../common/Link";
import { useRouter } from "next/router";
import {
  Activity,
  ArrowLeft,
  BaseIcon,
  Button,
  Flex,
  Key,
  Lock,
  Sliders,
  Text,
} from "@biolnk/gamut";
import { Routes } from "~/data/enums";
import type { FC } from "react";

const SideNavigation: FC = () => {
  const { push } = useRouter();

  return (
    <Flex
      as="aside"
      className="sm:flex-col flex-row justify-between sm:justify-start sm:pr-3.5 md:pr-6 lg:pr-8  min-w-max sticky top-0 h-fit bg-mauve-100 sm:pt-12 pt-6 pb-3.5 sm:pb-0 z-20"
    >
      <Flex className="sm:flex-col flex-row space-x-1.5 xs:space-x-2 sm:space-x-0 sm:space-y-2.5">
        <Link
          url="/account#general"
          className="py-3 sm:py-2.5 px-3.5 xs:px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg max-w-max sm:max-w-none h-fit"
        >
          <Flex align="center">
            <div className="sm:mr-3">
              <BaseIcon icon={Activity} size={16} />
            </div>

            <Text size="sm" className="sm:!block !hidden">
              General
            </Text>
          </Flex>
        </Link>

        <Link
          url="/account#preferences"
          className="py-3 sm:py-2.5 px-3.5 xs:px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg max-w-max sm:max-w-none h-fit"
        >
          <Flex align="center">
            <div className="sm:mr-3">
              <BaseIcon icon={Sliders} size={17} />
            </div>

            <Text size="sm" className="sm:!block !hidden">
              Preferences
            </Text>
          </Flex>
        </Link>

        <Link
          url="/account#change-password"
          className="py-3 sm:py-2.5 px-3.5 xs:px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg max-w-max sm:max-w-none h-fit"
        >
          <Flex align="center">
            <div className="sm:mr-3">
              <BaseIcon icon={Key} size={17} />
            </div>

            <Text size="sm" className="sm:!block !hidden">
              Change Password
            </Text>
          </Flex>
        </Link>

        <Link
          url="/account#security"
          className="py-3 sm:py-2.5 px-3.5 xs:px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg max-w-max sm:max-w-none h-fit"
        >
          <Flex align="center">
            <div className="sm:mr-3">
              <BaseIcon icon={Lock} size={17} />
            </div>

            <Text size="sm" className="sm:!block !hidden">
              Security
            </Text>
          </Flex>
        </Link>
      </Flex>

      <Button
        variant="text"
        className="sm:!mt-6"
        size="lg"
        icon={ArrowLeft}
        onClick={() => push(Routes.DASHBOARD)}
      >
        Back
      </Button>
    </Flex>
  );
};

export default SideNavigation;
