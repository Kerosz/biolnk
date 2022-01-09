import { __DEV__ } from ".";
import { PageLinkPreference } from "..";

export type PageLinkReturn = [string, string];
export type GetPageLinkSignature = (
  user: string,
  preference: "PATH" | "SUBDOMAIN" | "CUSTOM",
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
export const getPageLink: GetPageLinkSignature = (
  user,
  preference,
  customDomain = null
): PageLinkReturn => {
  let pageLinkLabel: string;
  let pageLinkUrl: string;

  switch (preference) {
    case PageLinkPreference.PATH: {
      pageLinkLabel = `biolnk.me/${user}`;
      pageLinkUrl = __DEV__
        ? `http://localhost:3000/p/${user}`
        : `https://biolnk.me/p/${user}`;
      break;
    }
    case PageLinkPreference.SUBDOMAIN: {
      pageLinkLabel = `${user}.biolnk.me`;
      pageLinkUrl = __DEV__
        ? `http://${user}.localhost:3000`
        : `https://${user}.biolnk.me`;
      break;
    }
    case PageLinkPreference.CUSTOM: {
      pageLinkLabel = customDomain as string;
      pageLinkUrl = `https://${customDomain}`;
      break;
    }
    default: {
      pageLinkLabel = "";
      pageLinkUrl = "";
      break;
    }
  }

  return [pageLinkLabel, pageLinkUrl];
};

export default getPageLink;
