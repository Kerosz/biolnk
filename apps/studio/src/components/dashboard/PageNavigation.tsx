import Link from "../common/Link";
import {
  Text,
  Flex,
  BaseIcon,
  Settings,
  Link as LinkIcon,
  BarChart2,
  Trello,
} from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";

const PageNavigation: React.FC = () => {
  return (
    <Flex justify="between" className="mb-10 border-b-2 border-mauve-600">
      <Flex className="space-x-8 ">
        <Link
          url={Routes.DASHBOARD}
          className="pb-4 pt-1 flex items-center space-x-1.5"
        >
          <BaseIcon icon={LinkIcon} />

          <Text>Links</Text>
        </Link>
        <Link
          url={Routes.PAGE}
          className="pb-4 pt-1 flex items-center space-x-1.5"
        >
          <BaseIcon icon={Trello} />

          <Text>Page</Text>
        </Link>
        <Link
          url={Routes.ANALYTICS}
          className="pb-4 pt-1 flex items-center space-x-1.5"
        >
          <BaseIcon icon={BarChart2} />

          <Text>Analytics</Text>
        </Link>
      </Flex>

      <Link url={Routes.ACCOUNT} className="text-mauveDark-700">
        <BaseIcon icon={Settings} size="lg" />
      </Link>
    </Flex>
  );
};

export default PageNavigation;
