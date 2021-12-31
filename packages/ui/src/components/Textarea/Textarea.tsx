import React, { forwardRef, useState } from "react";
import InputContainer from "../Input/InputContainer";
import InputEndIcon from "../Input/InputEndIcon";
import Button from "../Button/Button";
import { ctl } from "@biolnk/utils";
import { Copy, AlertCircle, CheckCircle } from "react-feather";

import Styles from "./Textarea.module.css";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Renders a button to copy the input value. */
  copy?: boolean;
  value?: string;
  defaultValue?: string;
  /** Description field to be displayed under the input. */
  descriptionText?: string;
  disabled?: boolean;
  /** Custom error field to be displayed. */
  error?: string;
  /** Renders a valid input state */
  valid?: boolean;
  /** Disables the label, and makes it only available for screen readers */
  srOnlyLabel?: boolean;
  label?: string;
  /** Input orientation
   * @default `horizontal``
   */
  layout?: "horizontal" | "vertical";
  name?: string;
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
 * UI `atom` level component for rendering an `<Textarea />`
 *
 * @component
 * @example
 * return (
 *    <Textarea
 *      label="My Label"
 *      srOnlyLabel
 *      error={errorMessage}
 *      valid={isFormValid}
 *      borderless
 *      copy
 *    />
 * )
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      style,
      className,
      value,
      defaultValue,
      placeholder,
      label,
      srOnlyLabel = false,
      disabled,
      descriptionText,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      triggerOnKey,
      layout = "horizontal",
      size = "sm",
      copy = false,
      borderless = false,
      error,
      valid,
      ...otherProps
    },
    ref
  ) => {
    const [copyLabel, setCopyLabel] = useState("Copy");

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
      event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (event.key === triggerOnKey && onKeyDown) {
        onKeyDown(event);
      }
    };

    const inptuClass = ctl(`
      ${Styles["blui-textarea"]}
      ${size && Styles[`blui-size-${size}`]}
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
          <textarea
            id={id}
            ref={ref}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
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

          {/* Action Buttons */}
          {copy || error || valid ? (
            <div className={Styles["blui-actions-container"]}>
              {error && (
                <InputEndIcon
                  icon={AlertCircle}
                  stroke="#f56565"
                  centered={false}
                />
              )}
              {valid && (
                <InputEndIcon
                  icon={CheckCircle}
                  stroke="#3d9a50"
                  centered={false}
                />
              )}
              {copy && (
                <Button
                  size="xs"
                  icon={Copy}
                  iconProps={{ size: "xs" }}
                  onClick={() => onCopy(value || defaultValue)}
                >
                  {copyLabel}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </InputContainer>
    );
  }
);

Textarea.displayName = "TextareaComponent";
