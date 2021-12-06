import React from "react";
import Icon from "../Icon";
import { AlertCircle } from "react-feather";

interface InputErrorIconProps {
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function InputErrorIcon({ style, size }: InputErrorIconProps) {
  return (
    <div
      className="inset-y-0 right-3 pr-2 pl-2 flex items-center pointer-events-none"
      style={style}
    >
      <Icon strokeWidth={2} stroke={"#f56565"} icon={AlertCircle} size={size} />
    </div>
  );
}
