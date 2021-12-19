import React, { forwardRef } from "react";
import BaseIcon, { BaseIconProps } from "../BaseIcon";
import { Icon } from "react-feather";
import { ctl } from "@biolnk/utils";
import { Loader } from "react-feather";

import Styles from "./Button.module.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  /**
   * Allows any component/string to be passed as the button tag
   *
   * @example
   * <Button as="a" variant="link">Anchor button</Button>
   */
  as?: keyof JSX.IntrinsicElements;
  /** Gives the button full width */
  block?: boolean;
  className?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Renders an icon on the `left` side of the button */
  icon?: Icon;
  /** Renders an icon on the `right` side of the button */
  iconRight?: Icon;
  iconProps?: Omit<BaseIconProps, "icon">;
  /** `Boolean` used to activate the `loading` state */
  loading?: boolean;
  /** Removes the button text and centers the loading spinner */
  loadingCentered?: boolean;
  /** Custom text for the loading button state */
  customLoadingText?: string;
  /** Enables button shadow */
  shadow?: boolean;
  /** Makes the button text uppercase and gives it letter tracking/spacing */
  uppercase?: boolean;
  /** Aligns the button text on the specified side.
   * @default `center`
   */
  textAlign?: "left" | "center" | "right";
  /** Size variants for the button
   * @default `xs`
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Size variant for the button icon
   * @default `xs`
   */
  style?: React.CSSProperties;
  /** Style variants for the button
   * @default `default`
   */
  variant?:
    | "primary"
    | "default"
    | "secondary"
    | "colored"
    | "outline"
    | "dashed"
    | "link"
    | "text";
  /** Enables the `danger`/`error` button state */
  danger?: boolean;
  ariaSelected?: boolean;
  ariaControls?: string;
  tabIndex?: 0 | -1;
  role?: string;
}

interface CustomButtonProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

/**
 * UI `atom` level component for rendering a `<Button />`
 *
 * @component
 * @example
 * return (
 *    <Button
 *      variant="primary"
 *      size="md"
 *      loading={isLoading}
 *      disabled={isInvalid}
 *      block
 *      uppercase
 *    >
 *      My Button
 *    </Button>
 * )
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      style,
      className,
      children,
      icon,
      iconRight,
      iconProps,
      loading = false,
      loadingCentered = false,
      customLoadingText = undefined,
      block = false,
      uppercase = false,
      shadow = true,
      danger = false,
      disabled = false,
      type = "button",
      size = "xs",
      variant = "default",
      textAlign = "center",
      onClick,
      ariaSelected,
      ariaControls,
      tabIndex,
      role,
      as,
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

    const textClass = ctl(`
      ${uppercase && Styles["blui-btn--upper"]}
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
          type={type}
          ref={ref}
          role={role}
          style={style}
          className={rootClass}
          disabled={!!loading || !!disabled}
          aria-disabled={!!loading || !!disabled}
          aria-selected={ariaSelected}
          aria-controls={ariaControls}
          onClick={onClick}
          tabIndex={tabIndex}
          {...otherProps}
        >
          {children}
        </button>
      );

    return (
      <RenderedButton>
        {loading ? (
          <BaseIcon icon={Loader} size={size} className={loadingClass} />
        ) : icon ? (
          <BaseIcon icon={icon} {...iconProps} />
        ) : null}
        {children && (
          <span className={textClass}>{loading ? loadingText : children}</span>
        )}
        {iconRight && !loading && <BaseIcon icon={iconRight} {...iconProps} />}
      </RenderedButton>
    );
  }
);

Button.displayName = "ButtonUIComponent";

export default Button;
