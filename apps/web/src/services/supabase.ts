import sbClient from "~/lib/supabase";
import { Link, PageWithMetadata, User, Tables } from "@biolnk/core";

export const getPageWithFilter = async (
  filterFiled: keyof PageWithMetadata,
  filterValue: string
) => {
  return sbClient
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
    integrations,
    user:users(
      id,
      username,
      avatar_url,
      full_name,
      biography,
      status,
      page_link
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
    .eq(filterFiled, filterValue)
    .limit(1)
    .single();
};

export const getLinksByUserId = async (userId: string) => {
  return sbClient
    .from<Link>(Tables.LINKS)
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true });
};

export const doesUsernameExist = async (username: string) => {
  const { data, error } = await sbClient
    .from<User>(Tables.USERS)
    .select("username")
    .eq("username", username)
    .single();

  if (!data || error) {
    return false;
  }

  return true;
};
