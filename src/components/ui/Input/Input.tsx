import React, { forwardRef, useState } from "react";
import InputErrorIcon from "./InputErrorIcon";
import InputContainer from "./InputContainer";
import Button from "../Button/Button";
import Icon from "../Icon";
import ctl from "~/utils/classname-literal";
import { Copy, Eye, EyeOff } from "react-feather";
import { isUndefined } from "lodash";

import Styles from "./Input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Renders a button to copy the input value. */
  copy?: boolean;
  value?: string;
  defaultValue?: string;
  /**  Description field to be displayed under the input. */
  descriptionText?: string;
  disabled?: boolean;
  /**  Custom error field to be displayed. */
  error?: string;
  icon?: any;
  /** Disables the label, and makes it only available for screen readers */
  srOnlyLabel?: boolean;
  label?: string;
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
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Renders the input component in the `borderless` state */
  borderless?: boolean;
  /**
   * Trigger the `keyDown` event on the specified key.
   * @see https://www.w3.org/TR/uievents-key/#keys-special
   */
  triggerOnKey?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoComplete,
      autoFocus,
      className,
      copy,
      defaultValue,
      descriptionText,
      disabled,
      error,
      icon,
      id,
      srOnlyLabel = false,
      label,
      layout,
      name,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      placeholder,
      type = "text",
      value,
      style,
      reveal = false,
      actions,
      size = "sm",
      borderless = false,
      triggerOnKey,
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
        function () {
          /* clipboard successfully set */
          setCopyLabel("Copied");
          setTimeout(() => {
            setCopyLabel("Copy");
          }, 3000);
        },
        function () {
          /* clipboard write failed */
          setCopyLabel("Failed to copy");
        }
      );
    };

    const onKeyDownWithTrigger = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === triggerOnKey) {
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
    ${borderless && !error && Styles["blui--borderless"]}
    ${error && Styles["blui--error"]}
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
        <div className={Styles["blui-container"]}>
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
          {icon && <div className={Styles["blui-icon-container"]}>{icon}</div>}

          {copy || error || actions || reveal || isPassword ? (
            <div className={Styles["blui-actions-container"]}>
              {error && <InputErrorIcon />}
              {copy && !masked ? (
                <Button
                  size="xs"
                  icon={<Icon icon={Copy} size="xs" />}
                  onClick={() => onCopy(value || defaultValue)}
                >
                  {copyLabel}
                </Button>
              ) : null}
              {masked && reveal ? (
                <Button size="xs" onClick={onReveal}>
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
                    <Icon icon={EyeOff} size={size} />
                  ) : (
                    <Icon icon={Eye} size={size} />
                  )}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </InputContainer>
    );
  }
);

Input.displayName = "InputComponent";

export default Input;
