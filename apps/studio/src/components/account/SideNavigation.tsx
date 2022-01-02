import Link from "../common/Link";
import { useRouter } from "next/router";
import { FC } from "react";
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
} from "@biolnk/ui";
import { Routes } from "~/data/enums";

const SideNavigation: FC = () => {
  const { push } = useRouter();

  return (
    <Flex
      as="aside"
      className="flex-col pr-8 space-y-2.5 min-w-max sticky top-10 h-fit"
    >
      <Link
        url="/account#general"
        className="py-2.5 px-4 bg-mauve-200 hover:bg-mauve-300 rounded-lg"
      >
        <Flex align="center">
          <div className="mr-3">
            <BaseIcon icon={Activity} size={16} />
          </div>

          <Text size="sm">General</Text>
        </Flex>
      </Link>

      <Link
        url="/account#preferences"
        className="py-2.5 px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg"
      >
        <Flex align="center">
          <div className="mr-3">
            <BaseIcon icon={Sliders} size={17} />
          </div>

          <Text size="sm">Preferences</Text>
        </Flex>
      </Link>

      <Link
        url="/account#change-password"
        className="py-2.5 px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg"
      >
        <Flex align="center">
          <div className="mr-3">
            <BaseIcon icon={Key} size={17} />
          </div>

          <Text size="sm">Change Password</Text>
        </Flex>
      </Link>

      <Link
        url="/account#security"
        className="py-2.5 px-4 bg-mauve-200 hover:bg-mauve-300 active:bg-mauve-200 rounded-lg"
      >
        <Flex align="center">
          <div className="mr-3">
            <BaseIcon icon={Lock} size={17} />
          </div>

          <Text size="sm">Security</Text>
        </Flex>
      </Link>

      <Button
        variant="text"
        className="!mt-6"
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
