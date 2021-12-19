import * as React from "react";
import { isString } from "@biolnk/utils";
import { Icon } from "react-feather";

export interface BaseIconProps extends React.SVGAttributes<SVGElement> {
  size?: IconSize | number;
  icon: Icon;
}

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type IconMap = {
  [Key in IconSize]: number;
};

export const BaseIcon: React.FC<BaseIconProps> = ({
  className,
  size,
  type,
  color,
  strokeWidth = 2,
  fill = undefined,
  stroke = undefined,
  icon: El,
  ...otherProps
}) => {
  const noColor = !color && !fill && !stroke;

  const SIZES_MAP: IconMap = {
    xs: 14,
    sm: 18,
    md: 20,
    lg: 20,
    xl: 24,
    "2xl": 30,
    "3xl": 42,
  };
  const DEFAULT_SIZE = SIZES_MAP["sm"];

  let iconSize: number = DEFAULT_SIZE;

  if (size) {
    iconSize = size ? (isString(size) ? SIZES_MAP[size] : size) : DEFAULT_SIZE;
  }

  return (
    <El
      color={!noColor ? color : "currentColor"}
      fill={!noColor ? (fill ? fill : "none") : "none"}
      stroke={!noColor ? stroke : "currentColor"}
      strokeWidth={strokeWidth}
      className={className}
      size={iconSize}
      {...otherProps}
    />
  );
};

BaseIcon.displayName = "IconComponent";

export default BaseIcon;
