// @ts-nocheck
import React, { forwardRef, useCallback } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ctl } from "@biolnk/utils";

import Styles from "./Avatar.module.css";

const DEFAULT_TAG = "span";

export type FallbackProps =
  | { fallback?: string; src?: string }
  | { fallback: string; src?: never };

export type AvatarOwnProps = React.ComponentPropsWithRef<typeof DEFAULT_TAG> & {
  alt: string;
  delay?: number;
  withBorder?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
} & FallbackProps;

const Avatar = forwardRef<HTMLSpanElement, AvatarOwnProps>(
  (
    {
      src,
      alt,
      fallback,
      withBorder = true,
      size = "md",
      delay,
      className,
      children,
      ...otherProps
    },
    ref
  ) => {
    const getFallback = useCallback((value: string) => {
      const fallbackValue = [];
      const splitValue = value.split(" ");
      const secondWord = splitValue[1];

      fallbackValue.push(value.charAt(0));

      if (secondWord && secondWord.length > 0) {
        fallbackValue.push(secondWord.charAt(0));
      } else {
        fallbackValue.push(value.charAt(1));
      }

      return fallbackValue.join("").toUpperCase();
    }, []);

    const defaultFallback = fallback ? getFallback(fallback) : getFallback(alt);

    const rootClass = ctl(`
      ${Styles["blui-avatar-root"]}
      ${withBorder && Styles["blui-avatar--border"]}
      ${size && Styles[`blui-avatar-size--${size}`]}
      ${className}
    `);

    return (
      <AvatarPrimitive.Root ref={ref} className={rootClass} {...otherProps}>
        {children}
        <AvatarPrimitive.Image
          className={Styles["blui-avatar---image"]}
          src={src}
          alt={alt}
        />
        <AvatarPrimitive.Fallback
          delayMs={delay}
          className={Styles["blui-avatar--fallback"]}
        >
          {defaultFallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

export { Avatar };
