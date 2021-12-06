import React from "react";
import Icon, { IconProps } from "../Icon";

interface InputEndIconProps extends IconProps {
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
      <Icon strokeWidth={2} stroke={stroke} icon={icon} size={size} />
    </div>
  );
}
