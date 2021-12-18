import React, { forwardRef, useState } from "react";
import InputContainer from "./InputContainer";
import InputEndIcon from "./InputEndIcon";
import InputAddon from "./InputAddon";
import Button from "../Button/Button";
import BaseIcon from "../BaseIcon";
import { ctl, isUndefined } from "@biolnk/utils";
import {
  Copy,
  Eye,
  EyeOff,
  Key,
  AlertCircle,
  CheckCircle,
} from "react-feather";

import Styles from "./Input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Renders a button to copy the input value. */
  copy?: boolean;
  leftAddon?: string;
  rightAddon?: string;
  /** Makes the spacing of the left addon smaller */
  tightAddonSpace?: boolean;
  value?: string;
  defaultValue?: string;
  /** Description field to be displayed under the input. */
  descriptionText?: string;
  disabled?: boolean;
  /** Custom error field to be displayed. */
  error?: string;
  /** Renders a valid input state */
  valid?: boolean;
  /** Renders custom a custom icon on the left side of the input */
  icon?: any;
  /** Disables the label, and makes it only available for screen readers */
  srOnlyLabel?: boolean;
  label?: string;
  /** Input orientation
   * @default `horizontal``
   */
  layout?: "horizontal" | "vertical";
  name?: string;
  /**
   * Renders a button to reveal the masked/hidden input value.
   *
   * IMPORTANT: Requires `readOnly` property to be `true`
   */
  reveal?: boolean;
  /** Additional actions to be rendered */
  actions?: React.ReactNode;
  /** Size variants for the input
   * @default `xs`
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Renders the input component in the `borderless` state */
  borderless?: boolean;
  /**
   * Trigger the `keyDown` event on the specified key.
   * @see https://www.w3.org/TR/uievents-key/#keys-special
   */
  triggerOnKey?: string;
}

/**
 * UI `atom` level component for rendering an `<Input />`
 *
 * @component
 * @example
 * return (
 *    <Input
 *      label="My Label"
 *      srOnlyLabel
 *      leftAddon="My Addon"
 *      error={errorMessage}
 *      valid={isFormValid}
 *      borderless
 *      copy
 *    />
 * )
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      name,
      style,
      className,
      value,
      defaultValue,
      placeholder,
      label,
      srOnlyLabel = false,
      disabled,
      leftAddon,
      rightAddon,
      tightAddonSpace,
      descriptionText,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      triggerOnKey,
      autoComplete,
      autoFocus,
      layout = "horizontal",
      size = "sm",
      copy = false,
      reveal = false,
      borderless = false,
      error,
      valid,
      icon,
      actions,
      ...otherProps
    },
    ref
  ) => {
    const [copyLabel, setCopyLabel] = useState("Copy");
    const [masked, setMasked] = useState(reveal);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const maskedPlaceholder = "**** **** **** ****";

    const onCopy = (copyValue: any) => {
      navigator.clipboard.writeText(copyValue).then(
        function() {
          /* clipboard successfully set */
          setCopyLabel("Copied");
          setTimeout(() => {
            setCopyLabel("Copy");
          }, 3000);
        },
        function() {
          /* clipboard write failed */
          setCopyLabel("Failed to copy");
        }
      );
    };

    const onKeyDownWithTrigger = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === triggerOnKey && onKeyDown) {
        onKeyDown(event);
      }
    };

    const onReveal = () => {
      setMasked(false);
    };

    const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    const inptuClass = ctl(`
      ${Styles["blui-input"]}
      ${size && Styles[`blui-size-${size}`]}
      ${icon && Styles["blui--with-icon"]}
      ${leftAddon && Styles["blui-addon--left"]}
      ${rightAddon && Styles["blui-addon--right"]}
      ${tightAddonSpace && Styles["blui-addon--tight"]}
    `);

    const containerClass = ctl(`
      group
      ${Styles["blui-container"]}
      ${error && Styles["blui--error"]}
      ${valid && Styles["blui--valid"]}
      ${borderless && !error && !valid && Styles["blui--borderless"]}
    `);

    return (
      <InputContainer
        srOnlyLabel={srOnlyLabel}
        label={label}
        layout={layout}
        id={id}
        error={error}
        descriptionText={descriptionText}
        style={style}
        size={size}
        className={className}
      >
        <div className={containerClass}>
          {/* Right Input Addon */}
          {leftAddon && (
            <InputAddon
              text={leftAddon}
              borderless={borderless}
              size={size}
              position="start"
              tightSpace={tightAddonSpace}
            />
          )}

          <input
            id={id}
            ref={ref}
            name={name}
            type={showPassword ? "text" : type}
            value={masked ? maskedPlaceholder : value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={onChange ? (event) => onChange(event) : undefined}
            onFocus={onFocus ? (event) => onFocus(event) : undefined}
            onBlur={onBlur ? (event) => onBlur(event) : undefined}
            onKeyDown={
              onKeyDown
                ? triggerOnKey
                  ? (event) => onKeyDownWithTrigger(event)
                  : (event) => onKeyDown(event)
                : undefined
            }
            className={inptuClass}
            {...otherProps}
          />

          {/* Left Input Icon */}
          {icon && <div className={Styles["blui-icon-container"]}>{icon}</div>}

          {/* Action Buttons */}
          {copy || error || actions || reveal || isPassword || valid ? (
            <div className={Styles["blui-actions-container"]}>
              {error && <InputEndIcon icon={AlertCircle} stroke="#f56565" />}
              {valid && <InputEndIcon icon={CheckCircle} stroke="#3d9a50" />}
              {copy && !masked ? (
                <Button
                  size="xs"
                  icon={Copy}
                  iconSize="xs"
                  onClick={() => onCopy(value || defaultValue)}
                >
                  {copyLabel}
                </Button>
              ) : null}
              {masked && reveal ? (
                <Button size="xs" icon={Key} iconSize="xs" onClick={onReveal}>
                  Reveal
                </Button>
              ) : null}
              {actions && actions}
              {isPassword && (
                <Button
                  size="xs"
                  onClick={toggleShowPassword}
                  disabled={!isUndefined(value) && value.length < 1}
                >
                  {showPassword ? (
                    <BaseIcon icon={EyeOff} size={size} />
                  ) : (
                    <BaseIcon icon={Eye} size={size} />
                  )}
                </Button>
              )}
            </div>
          ) : null}

          {/* Right Input Addon */}
          {rightAddon && (
            <InputAddon
              text={rightAddon}
              borderless={borderless}
              size={size}
              position="end"
            />
          )}
        </div>
      </InputContainer>
    );
  }
);

Input.displayName = "InputComponent";

export default Input;
