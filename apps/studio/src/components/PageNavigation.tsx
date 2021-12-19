import { Text } from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";
import Link from "./common/Link";

const PageNavigation: React.FC = () => {
  return (
    <ul className="flex space-x-8 mb-8 border-b-2 border-mauve-600">
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
        <Link url={Routes.DESIGN}>
          <Text>Analytics</Text>
        </Link>
      </li>
      <li className="py-4">
        <Link url={Routes.ACCOUNT}>
          <Text>Account</Text>
        </Link>
      </li>
    </ul>
  );
};

export default PageNavigation;
