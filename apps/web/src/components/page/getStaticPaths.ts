import sbClient from "~/lib/supabase";
import type { Page } from "@biolnk/core";
import type { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  // get all sites that have subdomains set up
  const subdomains = await sbClient.from<Page>("pages").select("subdomain");

  // get all sites that have custom domains set up
  const customDomains = await sbClient
    .from<Page>("pages")
    .select("custom_domain")
    .not("custom_domain", "is", null);

  const paths = [
    ...(subdomains.data || []).map((p) => {
      return p.subdomain;
    }),
    ...(customDomains.data || []).map((p) => {
      return p.custom_domain;
    }),
  ];

  return {
    paths: paths.map((path) => {
      return { params: { page: path } };
    }),
    fallback: true,
  };
};
