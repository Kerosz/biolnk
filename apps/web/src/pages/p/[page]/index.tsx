import PageContent from "~/components/page/PageContent";
import { useRouter } from "next/router";
import { Loading } from "@biolnk/gamut";
import { UserPageLayout } from "~/components/layouts";
import type { NextPage } from "next";
import type { Link, PageWithMetadata } from "@biolnk/core";

interface PageScreenProps {
  domain: string;
  page: PageWithMetadata;
  links: Link[];
}

const PageScreen: NextPage<PageScreenProps> = ({ domain, page, links }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  return (
    <UserPageLayout backgroundCss={page.theme.style.background.css}>
      <PageContent
        title={page.title}
        bio={page.user.biography}
        links={links}
        style={page.theme.style}
      />
    </UserPageLayout>
  );
};

export { getStaticPaths } from "~/components/page/getStaticPaths";
export { getStaticProps } from "~/components/page/getStaticProps";

export default PageScreen;
