import { Text, Flex } from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";
import Link from "../common/Link";

const PageNavigation: React.FC = () => {
  return (
    <Flex as="ul" className="space-x-8 mb-10 border-b-2 border-mauve-600">
      <li className="py-4">
        <Link url={Routes.DASHBOARD}>
          <Text>Overview</Text>
        </Link>
      </li>
      <li className="py-4">
        <Link url={Routes.DESIGN}>
          <Text>Design</Text>
        </Link>
      </li>
      <li className="py-4">
        <Link url={Routes.ANALYTICS}>
          <Text>Analytics</Text>
        </Link>
      </li>
      <li className="py-4">
        <Link url={Routes.ACCOUNT}>
          <Text>Account</Text>
        </Link>
      </li>
    </Flex>
  );
};

export default PageNavigation;
