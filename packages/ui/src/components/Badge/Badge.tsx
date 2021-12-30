import React, { forwardRef } from "react";
import {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";
import { ctl } from "@biolnk/utils";

import Styles from "./Badge.module.css";

export interface BadgeOwnProps {
  variant?:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "crimson"
    | "plum"
    | "lime";
  size?: "default" | "lg";
  withDot?: boolean;
}

export type BadgeProps<C extends React.ElementType> = PolymorphicPropsWithRef<
  BadgeOwnProps,
  C
>;

const DEFAULT_TAG = "span";

/**
 * UI `atom` level component for rendering a `<Badge />`
 *
 * @component
 * @example
 * return (
 *    <Badge variant="crimson" withDot>
 *      My Badge
 *    </Badge>
 * )
 */
export const Badge = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      size = "default",
      variant = "gray",
      withDot = false,
      children,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<BadgeOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const isLarge = size === "lg";

    const rootClass = ctl(`
      ${Styles["blui-badge"]}
      ${Styles[`blui-badge--${variant}`]}
      ${isLarge && Styles["blui-badge--large"]}
      ${className}
    `);

    const dotClass = ctl(`
      ${Styles[`blui-badge-dot`]}
      ${Styles[`blui-badge--${variant}`]}
    `);

    return (
      <Element ref={ref} className={rootClass} {...otherProps}>
        {withDot && (
          <svg className={dotClass} fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
        )}
        {children}
      </Element>
    );
  }
);

Badge.displayName = "BadgeUIComponent";
