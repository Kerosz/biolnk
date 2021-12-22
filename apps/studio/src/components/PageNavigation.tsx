import { Text, Flex } from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";
import Link from "./common/Link";

const NAV_LINKS = [
  {
    path: Routes.DASHBOARD,
    label: "Overview",
  },
  {
    path: Routes.DESIGN,
    label: "Design",
  },
  {
    path: Routes.ANALYTICS,
    label: "Analytics",
  },
  {
    path: Routes.ACCOUNT,
    label: "Account",
  },
];

const PageNavigation: React.FC = () => {
  return (
    <Flex as="ul" className="space-x-8 mb-8 border-b-2 border-mauve-600">
      {NAV_LINKS.map(({ path, label }, idx) => (
        <li key={`pn-links_${idx}`} className="py-4">
          <Link url={path}>
            <Text>{label}</Text>
          </Link>
        </li>
      ))}
    </Flex>
  );
};

export default PageNavigation;
