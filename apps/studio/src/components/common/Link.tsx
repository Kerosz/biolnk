import React, { forwardRef } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ctl } from "@biolnk/utils";

export interface LinkProps
  extends Omit<NextLinkProps, "href" | "as">,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  url: string;
  external?: boolean;
  variant?: "hover" | "basic";
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      url,
      external = false,
      variant = "basic",
      children,
      className,
      replace,
      passHref,
      ...otherProps
    },
    ref
  ) => {
    const isHover = variant === "hover";
    const matchInternal = url.startsWith("/") || url.startsWith("#");

    const rootClass = ctl(`
      ${className}
      ${isHover && "hover:underline"}
    `);

    // Use Next Link for internal links, and <a> for others
    if (external || !matchInternal) {
      return (
        <a
          className={rootClass}
          ref={ref}
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          {...otherProps}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink href={url} replace={replace} passHref>
        <a ref={ref} className={rootClass} {...otherProps}>
          {children}
        </a>
      </NextLink>
    );
  }
);

Link.displayName = "LinkComponent";

export default Link;
