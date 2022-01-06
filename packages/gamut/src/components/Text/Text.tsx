import React, { forwardRef } from "react";
import {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";
import { ctl } from "@biolnk/utils";

import Styles from "./Text.module.css";

export interface TextOwnProps {
  size?: "xs" | "sm" | "default" | "leading" | "lg" | "xl";
  spacing?: "tight" | "default" | "wide" | "wider" | "widest";
  variant?:
    | "lighter"
    | "light"
    | "gray"
    | "default"
    | "success"
    | "warning"
    | "danger";
  disabled?: boolean;
  /** Gives a wavey underline effect to the text */
  underline?: boolean;
  strikeThrough?: boolean;
  strong?: boolean;
  center?: boolean;
}

/** @TODO add support for truncating text */
export type TruncateProps =
  | { truncate?: false; showExpanded?: never }
  | { truncate: true; showExpanded?: boolean };

export type TextProps<C extends React.ElementType> = PolymorphicPropsWithRef<
  TextOwnProps & TruncateProps,
  C
>;

const DEFAULT_TAG = "span";

/**
 * UI `atom` level component for rendering a `<Text />`
 *
 * @component
 * @example
 * return (
 *    <Text
 *      variant="gray"
 *      size="leading"
 *      strong
 *      underline
 *    >
 *      My Text
 *    </Text>
 * )
 */
export const Text = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      size = "default",
      spacing = "default",
      variant = "default",
      disabled = false,
      strikeThrough = false,
      underline = false,
      strong = false,
      center = false,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<TextOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const rootClass = ctl(`
      block
      ${center && Styles["blui-centered"]}
      ${spacing && Styles[`blui-space--${spacing}`]}
      ${variant && Styles[`blui-variant--${variant}`]}
      ${size && Styles[`blui-size--${size}`]}
      ${disabled && Styles["blui-disabled"]}
      ${strikeThrough && "line-through"}
      ${underline && Styles["blui-underline"]}
      ${strong && "font-bold"}
      ${className}
    `);

    return <Element ref={ref} className={rootClass} {...otherProps} />;
  }
);

Text.displayName = "TextUIComponent";
