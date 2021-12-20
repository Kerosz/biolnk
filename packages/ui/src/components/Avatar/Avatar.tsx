import React, { forwardRef, useCallback } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ctl } from "@biolnk/utils";

import Styles from "./Avatar.module.css";

const DEFAULT_TAG = "span";

export interface AvatarOwnProps
  extends React.ComponentPropsWithRef<typeof DEFAULT_TAG> {
  src?: string;
  alt: string;
  fallback?: string;
  delay?: number;
}

const Avatar = forwardRef<HTMLSpanElement, AvatarOwnProps>(
  ({ src, alt, fallback, delay, className, ...otherProps }, ref) => {
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

    const defaultFallback = fallback ?? getFallback(alt);

    const rootClass = ctl(`
      ${Styles["blui-root"]}
      ${className}
    `);

    return (
      <AvatarPrimitive.Root ref={ref} className={rootClass} {...otherProps}>
        <AvatarPrimitive.Image
          className={Styles["blui-image"]}
          src={src}
          alt={alt}
        />
        <AvatarPrimitive.Fallback
          delayMs={delay}
          className={Styles["blui-fallback"]}
        >
          {defaultFallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

export { Avatar };
