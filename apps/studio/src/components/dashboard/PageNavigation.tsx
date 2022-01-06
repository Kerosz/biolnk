import Link from "../common/Link";
import { useRouter } from "next/router";
import {
  Flex,
  BaseIcon,
  Settings,
  Link as LinkIcon,
  BarChart2,
  Trello,
} from "@biolnk/gamut";
import { Routes } from "~/data/enums/routes";
import { ctl } from "@biolnk/utils";

const PageNavigation: React.FC = () => {
  const { pathname } = useRouter();

  const getActiveLink = (value: string) => {
    const totalNumberOfLinksOnPage = 3;
    const paths = pathname.split("/");

    /**
     * We replace the empty string of the first entry with
     * `links` so we can get a matching value to account
     * for when the pathname is only "/dashboard"
     */
    if (paths.length < totalNumberOfLinksOnPage) {
      paths[0] = paths[0].replace("", "links");
    }

    return paths.includes(value);
  };

  return (
    <Flex justify="between" className="mb-10 border-b-2 border-mauve-600">
      <Flex className="space-x-5 xs:space-x-8 transform-gpu translate-y-0.5">
        <Link
          url={Routes.DASHBOARD}
          className={ctl(
            `pb-3 pt-1 flex items-center space-x-1.5 border-b-2 ${
              getActiveLink("links")
                ? "text-mauve-1000 border-mauve-1000"
                : "text-mauve-950 border-transparent"
            }`
          )}
        >
          <BaseIcon icon={LinkIcon} />

          <span>Links</span>
        </Link>
        <Link
          url={Routes.PAGE}
          className={ctl(
            `pb-3 pt-1 flex items-center space-x-1.5 border-b-2 ${
              getActiveLink("page")
                ? "text-mauve-1000 border-mauve-1000"
                : "text-mauve-950 border-transparent"
            }`
          )}
        >
          <BaseIcon icon={Trello} />

          <span>Page</span>
        </Link>
        <Link
          url={Routes.STATS}
          className={ctl(
            `pb-3 pt-1 flex items-center space-x-1.5 border-b-2 ${
              getActiveLink("stats")
                ? "text-mauve-1000 border-mauve-1000"
                : "text-mauve-950 border-transparent"
            }`
          )}
        >
          <BaseIcon icon={BarChart2} />

          <span>Stats</span>
        </Link>
      </Flex>

      <Link url={Routes.ACCOUNT} className="text-mauveDark-700 pb-1">
        <BaseIcon icon={Settings} size="lg" />
      </Link>
    </Flex>
  );
};

export default PageNavigation;
