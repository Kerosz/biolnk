import sbClient from "~/lib/supabase";
import { Link, Page, PageWithMetadata, Tables } from "@biolnk/core";
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

  const pageRecord = await sbClient
    .from<PageWithMetadata>(Tables.PAGES)
    .select(
      `
    id,
    title,
    subdomain,
    custom_domain,
    seo_title,
    seo_description,
    nsfw_content,
    show_branding,
    social_link_position,
    user:users(
      id,
      username,
      avatar_url,
      full_name,
      biography,
      status
    ),
    theme:themes(
      id,
      style,
      name,
      kind,
      state
    )
  `
    )
    .eq(filter, page)
    .limit(1)
    .single();

  if (!pageRecord.data || pageRecord.error) {
    return { notFound: true, revalidate: 1 };
  }

  const linkRecords = await sbClient
    .from<Link>(Tables.LINKS)
    .select("*")
    .eq("user_id", pageRecord.data.user.id);

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
