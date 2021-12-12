import React from "react";
import BaseIcon, { BaseIconProps } from "../BaseIcon";

interface InputEndIconProps extends BaseIconProps {
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function InputEndIcon({
  style,
  size,
  stroke,
  icon,
}: InputEndIconProps) {
  return (
    <div
      className="inset-y-0 right-3 pr-2 pl-2 flex items-center pointer-events-none"
      style={style}
    >
      <BaseIcon strokeWidth={2} stroke={stroke} icon={icon} size={size} />
    </div>
  );
}
