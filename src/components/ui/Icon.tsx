import * as React from "react";
import { isString } from "lodash";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: IconSize | number;
  icon: any;
}

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type IconMap = {
  [Key in IconSize]: number;
};

function Icon({
  className,
  size,
  type,
  color,
  strokeWidth = 2,
  fill = undefined,
  stroke = undefined,
  icon: El,
  ...otherProps
}: IconProps) {
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
  const DEFAULT_SIZE = SIZES_MAP["lg"];

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
}

export default Icon;
