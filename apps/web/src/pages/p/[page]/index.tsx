import seoConfig from "web.seo";
import { useRouter } from "next/router";
import { Loading } from "@biolnk/gamut";
import { Link, PageWithMetadata, getPageLink, UserStatus } from "@biolnk/core";
import {
  PageContent,
  GoogleAnalyticsIntegration,
  SensitiveContentAgreement,
} from "~/components/page";
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
    <>
      <GoogleAnalyticsIntegration
        trackingID={page.integrations.google_analytics_id}
        pageID={page.id}
      />

      <UserPageLayout
        backgroundCss={page.theme.style.background.css}
        seoOptions={{
          title: page.seo_title || `${page.title}’s Page`,
          description: page.seo_description || seoConfig.description,
          canonical: pageLinkUrl,
        }}
      >
        <SensitiveContentAgreement
          pageID={page.id}
          defaultAgreement={page.nsfw_content}
        />
        <PageContent
          avatarURL={page.user.avatar_url}
          title={page.title}
          bio={page.user.biography}
          links={links}
          style={page.theme.style}
          showBrand={page.show_branding}
          showVerifiedBadge={page.user.status === UserStatus.VERIFIED}
        />
      </UserPageLayout>
    </>
  );
};

export { getStaticPaths } from "~/components/page/index";
export { getStaticProps } from "~/components/page/index";

export default PageScreen;
