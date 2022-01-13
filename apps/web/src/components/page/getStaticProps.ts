import { getLinksByUserId, getPageWithFilter } from "~/services/supabase";
import type { GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

export interface PageParams extends ParsedUrlQuery {
  page: string;
}

export type PageDomainFilter = "subdomain" | "custom_domain";

export const getStaticProps: GetStaticProps<{}, PageParams> = async ({
  params: { page },
}) => {
  let filter: PageDomainFilter = "subdomain";
  if (page.includes(".")) {
    filter = "custom_domain";
  }

  const pageRecord = await getPageWithFilter(filter, page);

  if (!pageRecord.data || pageRecord.error) {
    return { notFound: true, revalidate: 1 };
  }

  const linkRecords = await getLinksByUserId(pageRecord.data.user.id);

  if (!linkRecords.data || linkRecords.error) {
    return {
      revalidate: 1,
      props: { domain: page, page: pageRecord.data, links: [] },
    };
  }

  return {
    props: {
      domain: page,
      page: pageRecord.data,
      links: linkRecords.data,
    },
    revalidate: 1,
  };
};
