import sbClient from "~/lib/supabase";
import { Loading } from "@biolnk/ui";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layouts";

export default function PageScreen({ domain, page }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  return <PageLayout theme={page.theme} />;
}

export type Page = {
  id: string;
  user_id: string;
  theme: string;
  title: string;
  subdomain: string;
  custom_domain: string;
  seo_title: string | null;
  seo_description: string | null;
  nsfw_content: boolean;
  show_branding: boolean;
  social_link_position: any;
  inserted_at: string;
  updated_at: string;
};

export async function getStaticPaths() {
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
}

export async function getStaticProps({ params: { page } }) {
  let filter: "subdomain" | "custom_domain" = "subdomain";
  if (page.includes(".")) {
    filter = "custom_domain";
  }

  const { data, error } = await sbClient
    .from<Page>("pages")
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

  if (!data || error) {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      domain: page,
      page: data,
    },
    revalidate: 1,
  };
}
