// @ts-nocheck
import React from "react";
import {
  Root,
  Trigger,
  Content,
  Arrow,
  TooltipContentProps,
} from "@radix-ui/react-tooltip";
import { ctl } from "@biolnk/core";

import Styles from "./Tooltip.module.css";

const DEFAULT_TAG = "div";

export interface TooltipOwnProps
  extends React.ComponentPropsWithoutRef<typeof DEFAULT_TAG>,
    TooltipContentProps {
  content: React.ReactNode;
  delay?: number;
}

const Tooltip = ({
  content,
  className,
  children,
  delay = 250,
  sideOffset = 5,
  ...otherProps
}: TooltipOwnProps) => {
  const rootClass = ctl(`
      ${Styles["blui-tooltip-root"]}
      ${className}
    `);

  return (
    <Root delayDuration={delay}>
      <Trigger asChild>
        {/* The div is necessary so we do not render a button in a button
         * this way the `Trigger` will take the shape of the div and we can
         * render the `button` within the `div`
         */}
        <div className={Styles["blui-tooltip-trigger--child"]}>{children}</div>
      </Trigger>
      <Content sideOffset={sideOffset} className={rootClass} {...otherProps}>
        {content}

        <Arrow />
      </Content>
    </Root>
  );
};
export { Tooltip };
