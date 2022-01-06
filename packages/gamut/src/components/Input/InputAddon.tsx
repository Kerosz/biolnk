import React from "react";
import { ctl } from "@biolnk/utils";

import Styles from "./InputAddon.module.css";

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: "start" | "end";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  borderless?: boolean;
  error?: boolean;
  tightSpace?: boolean;
}

function InputAddon({
  borderless = false,
  error,
  position = "start",
  size,
  text,
  tightSpace,
}: InputAddonProps) {
  const isLeftAddon = position === "start";
  const isRightAddon = position === "end";

  const rootClass = ctl(`
    ${Styles["blui-root"]}
    ${size && Styles[`blui-size-${size}`]}
    ${isLeftAddon && Styles["blui-position--start"]}
    ${isRightAddon && Styles["blui-position--end"]}
    ${borderless && !error && Styles["blui--borderless"]}
    ${tightSpace && Styles["blui-addon--tight"]}
  `);

  return <div className={rootClass}>{text}</div>;
}

export default InputAddon;
