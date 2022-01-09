import PageContent from "~/components/page/PageContent";
import seoConfig from "web.seo";
import { useRouter } from "next/router";
import { Loading } from "@biolnk/gamut";
import { Link, PageWithMetadata, getPageLink } from "@biolnk/core";
import { UserPageLayout } from "~/components/layouts";
import type { NextPage } from "next";

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

  const [_, pageLinkUrl] = getPageLink(page.subdomain, page.user.page_link);

  return (
    <UserPageLayout
      backgroundCss={page.theme.style.background.css}
      seoOptions={{
        title: page.seo_title || `${page.title}’s Page`,
        description: page.seo_description || seoConfig.description,
        canonical: pageLinkUrl,
      }}
    >
      <PageContent
        avatar={page.user.avatar_url}
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
