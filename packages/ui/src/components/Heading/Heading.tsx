import React, { forwardRef } from "react";
import {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";
import { ctl } from "@biolnk/utils";

import Styles from "./Text.module.css";

export interface HeadingOwnProps {
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl";
  spacing?: "tight" | "default" | "wide" | "wider" | "widest";
  variant?: "lighter" | "light" | "gray" | "default";
  /** Gives a wavey underline effect to the text */
  underline?: boolean;
}

export type HeadingProps<C extends React.ElementType> = PolymorphicPropsWithRef<
  HeadingOwnProps,
  C
>;

const DEFAULT_TAG = "h3";

/**
 * UI `atom` level component for rendering a `<Heading />`
 *
 * @component
 * @example
 * return (
 *    <Heading
 *      variant="gray"
 *      size="xl"
 *      underline
 *    >
 *      My Heading
 *    </Heading>
 * )
 */
export const Heading = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      size = "default",
      spacing = "default",
      variant = "default",
      underline = false,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<HeadingOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const rootClass = ctl(`
      ${spacing && Styles[`blui-space--${spacing}`]}
      ${variant && Styles[`blui-variant--${variant}`]}
      ${size && Styles[`blui-size--${size}`]}
      ${underline && "underline decoration-wavy decoration-2"}
      ${className}
    `);

    return <Element ref={ref} className={rootClass} {...otherProps} />;
  }
);

Heading.displayName = "HeadingUIComponent";
