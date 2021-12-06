import React, { forwardRef } from "react";
import Icon from "../Icon";
import ctl from "~/utils/classname-literal";
import { Loader } from "react-feather";

import Styles from "./Button.module.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  className?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  loadingCentered?: boolean;
  customLoadingText?: string;
  shadow?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: React.CSSProperties;
  variant?:
    | "primary"
    | "default"
    | "secondary"
    | "colored"
    | "outline"
    | "dashed"
    | "link"
    | "text";
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  ariaSelected?: boolean;
  ariaControls?: string;
  tabIndex?: 0 | -1;
  role?: string;
  textAlign?: "left" | "center" | "right";
  as?: keyof JSX.IntrinsicElements;
}

interface CustomButtonProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      block,
      className,
      children,
      danger,
      disabled = false,
      onClick,
      icon,
      iconRight,
      loading = false,
      loadingCentered = false,
      customLoadingText,
      shadow = true,
      size = "xs",
      style,
      variant = "default",
      type = "button",
      ariaSelected,
      ariaControls,
      tabIndex,
      role,
      as,
      textAlign = "center",
      ...otherProps
    },
    ref
  ) => {
    const isLink = variant !== "link";
    const isText = variant !== "text";

    const loadingText = customLoadingText ?? "Processing";

    const rootClass = ctl(`
      ${Styles["blui-btn"]}
      ${Styles[`blui-btn-${variant}`]}
      ${block && Styles["blui-btn--w-full"]}
      ${danger && Styles["blui-btn--danger"]}
      ${
        shadow && isLink && isText
          ? Styles["blui-btn-container--shadow"]
          : undefined
      }
      ${size && Styles[`blui-btn--${size}`]}
      ${loading && loadingCentered && Styles[`blui-btn--text-fade-out`]}
      ${Styles[`blui-btn--text-align-${textAlign}`]}
      ${className && className}
    `);

    const loadingClass = ctl(`
      ${Styles["blui-btn--anim--spin"]}
      ${loadingCentered && Styles[`blui-btn-loader--center`]}
      ${loading && loadingCentered && Styles[`blui-btn--text-fade-out`]}
    `);

    const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {
      const El = as as keyof JSX.IntrinsicElements;
      return <El {...props} />;
    };

    const RenderedButton = ({ children }: any) =>
      as ? (
        <CustomButton className={rootClass} onClick={onClick} style={style}>
          {children}
        </CustomButton>
      ) : (
        <button
          {...otherProps}
          ref={ref}
          className={rootClass}
          disabled={loading || (disabled && true)}
          onClick={onClick}
          style={style}
          type={type}
          aria-selected={ariaSelected}
          aria-controls={ariaControls}
          tabIndex={tabIndex}
          role={role}
        >
          {children}
        </button>
      );

    return (
      <RenderedButton>
        {loading ? (
          <Icon icon={Loader} size={size} className={loadingClass} />
        ) : icon ? (
          icon
        ) : null}
        {children && <span>{loading ? loadingText : children}</span>}
        {iconRight && !loading && iconRight}
      </RenderedButton>
    );
  }
);

Button.displayName = "ButtonComponent";

export default Button;
