import React, { forwardRef } from "react";
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";
import { ctl } from "@biolnk/utils";

import Styles from "./Container.module.css";

export interface ContainerOwnProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  resetBaseStyle?: boolean;
}

export type ContainerProps<
  C extends React.ElementType
> = PolymorphicPropsWithRef<ContainerOwnProps, C>;

const DEFAULT_TAG = "section";

export const Container: PolymorphicForwardRefExoticComponent<
  ContainerOwnProps,
  typeof DEFAULT_TAG
> = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      children,
      as,
      maxWidth,
      resetBaseStyle,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<ContainerOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const rootClass = ctl(`
      ${!resetBaseStyle && Styles["blui-root"]}
      ${maxWidth && Styles[`blui-size--${maxWidth}`]}
      ${className}
    `);

    return <Element ref={ref} className={rootClass} {...otherProps} />;
  }
);

Container.displayName = "ContainerUIComponent";
