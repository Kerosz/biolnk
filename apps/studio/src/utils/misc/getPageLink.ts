import { PageLinkPreference } from "@biolnk/core";

export type PageLinkReturn = [label: string, url: string];
export type GetPageLinkSignature = (
  user: string,
  preference: `${PageLinkPreference}`,
  customDomain?: string | null
) => PageLinkReturn;

/**
 * It gets the `URL` path and `Label` for the user
 * page according to his page preference
 *
 * @param user - Biolnk username
 * @param preference - Page preference type
 * @param [customDomain] - User custom domain
 * @returns {PageLinkReturn} `[label, url]`
 */
const getPageLink: GetPageLinkSignature = (
  user,
  preference,
  customDomain = null
): PageLinkReturn => {
  let pageLinkLabel: string;
  let pageLinkUrl: string;

  switch (preference) {
    case PageLinkPreference.PATH:
      pageLinkLabel = `biolnk.me/${user}`;
      pageLinkUrl = `https://biolnk.me/${user}`;
      break;
    case PageLinkPreference.SUBDOMAIN:
      pageLinkLabel = `${user}.biolnk.me`;
      pageLinkUrl = `https://${user}.biolnk.me`;
      break;
    case PageLinkPreference.CUSTOM:
      pageLinkLabel = customDomain;
      pageLinkUrl = `https://${customDomain}`;
    default:
      pageLinkLabel = "";
      pageLinkUrl = "";
      break;
  }

  return [pageLinkLabel, pageLinkUrl];
};

export default getPageLink;
