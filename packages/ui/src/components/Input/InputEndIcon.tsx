import React from "react";
import BaseIcon, { BaseIconProps } from "../BaseIcon";
import { ctl } from "@biolnk/utils";

interface InputEndIconProps extends BaseIconProps {
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

export default function InputEndIcon({
  style,
  size,
  stroke,
  icon,
  centered = true,
}: InputEndIconProps) {
  const rootClass = ctl(`
    inset-y-0 right-3 pr-2 pl-2 flex pointer-events-none
    ${centered ? "items-center" : "top-0"}
  `);

  return (
    <div className={rootClass} style={style}>
      <BaseIcon strokeWidth={2} stroke={stroke} icon={icon} size={size} />
    </div>
  );
}
