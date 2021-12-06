import React from "react";
import ctl from "~/utils/classname-literal";

import Styles from "./InputContainer.module.css";

type InputContainerProps = {
  align?: string;
  children?: any;
  className?: string;
  descriptionText?: string;
  error?: string;
  id?: string;
  srOnlyLabel: boolean;
  label?: string;
  labelOptional?: string;
  layout?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  flex?: boolean;
  responsive?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  beforeLabel?: string;
  afterLabel?: string;
};

export default function InputContainer({
  align,
  children,
  className,
  descriptionText,
  error,
  id,
  srOnlyLabel,
  label,
  labelOptional,
  layout = "vertical",
  style,
  flex,
  responsive = true,
  size = "md",
  beforeLabel,
  afterLabel,
}: InputContainerProps) {
  const isLabelled = Boolean(label || beforeLabel || afterLabel);
  const isVertical = layout === "vertical";
  const isHorizontal = layout === "horizontal";
  const isLeftAligned = align === "left";
  const isRightAligned = align === "right";

  const rootClass = ctl(`
    ${Styles["blui-root"]}
    ${size && Styles[`blui-size--${size}`]}
    ${flex && Styles["blui-root--flex"]}
    ${flex && isLeftAligned ? Styles["blui-root--flex-left"] : undefined}
    ${flex && isRightAligned ? Styles["blui-root--flex-right"] : undefined}
    ${!flex && responsive ? Styles["blui-root--responsive"] : undefined}
    ${!flex && !responsive ? Styles["blui-root--non-responsive"] : undefined}
    ${className && className}
  `);

  const labelContainerClass = ctl(`
    ${isVertical && !flex ? Styles["blui-label-vertical"] : undefined}
    ${isHorizontal && !flex ? Styles["blui-label-horizontal"] : undefined}
  `);

  const labelClass = ctl(`
    ${Styles["blui-label"]}
    ${srOnlyLabel && "sr-only"}
  `);

  const containerClass = ctl(`
    ${isHorizontal && Styles["blui-container-horizontal"]}
    ${isVertical && Styles["blui-container-vertical"]}
    ${
      isVertical && isRightAligned
        ? Styles["blui-container-vertical--align-right"]
        : undefined
    }
  `);

  return (
    <div className={rootClass}>
      {isLabelled || labelOptional || isHorizontal ? (
        <div className={labelContainerClass}>
          {isLabelled && (
            <label className={labelClass} htmlFor={id}>
              {beforeLabel && (
                <span
                  className={Styles["blui-label-before"]}
                  id={id + "-before"}
                >
                  {beforeLabel}
                </span>
              )}
              {label}
              {afterLabel && (
                <span className={Styles["blui-label-after"]} id={id + "-after"}>
                  {afterLabel}
                </span>
              )}
            </label>
          )}
          {labelOptional && (
            <span className={Styles["blui-label-opt"]} id={id + "-optional"}>
              {labelOptional}
            </span>
          )}
        </div>
      ) : null}
      <div className={containerClass} style={style}>
        {children}
        {error && <p className={Styles["blui-error"]}>{error}</p>}
        {descriptionText && (
          <p className={Styles["blui-desc"]} id={id + "-description"}>
            {descriptionText}
          </p>
        )}
      </div>
    </div>
  );
}
