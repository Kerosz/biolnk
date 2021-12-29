import React, { forwardRef } from "react";
import {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";
import { ctl } from "@biolnk/utils";

import Styles from "./Badge.module.css";

export interface BadgeOwnProps {}

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
 *    <Badge>
 *      My Badge
 *    </Badge>
 * )
 */
export const Badge = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<BadgeOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const rootClass = ctl(`
      ${className}
    `);

    return <Element ref={ref} className={rootClass} {...otherProps} />;
  }
);

Badge.displayName = "BadgeUIComponent";
