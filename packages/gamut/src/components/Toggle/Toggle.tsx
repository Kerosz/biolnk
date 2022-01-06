import React, { forwardRef } from "react";
import { Switch } from "@headlessui/react";
import { ctl } from "@biolnk/utils";
import {
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
  PolymorphicRef,
} from "@/types";

import Styles from "./Toggle.module.css";

export interface ToggleOwnProps {
  defaultChecked?: boolean;
  checked: boolean;
  label?: string;
  onCheckedChange(): void;
  size?: "lg" | "md" | "sm";
  variant?:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "crimson"
    | "plum"
    | "lime";
  toggleClassName?: string;
}

export type ToggleProps<C extends React.ElementType> = PolymorphicPropsWithRef<
  ToggleOwnProps,
  C
>;

const DEFAULT_TAG = "button";

/**
 * UI `atom` level component for rendering a `<Toggle />`
 *
 * @component
 * @example
 * return (
 *    <Toggle
 *      variant="gray"
 *      label="My Toggle"
 *    />
 * )
 */
export const Toggle = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      variant = "gray",
      size = "md",
      className,
      toggleClassName,
      label,
      checked,
      onCheckedChange,
    }: PolymorphicPropsWithoutRef<ToggleOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    const rootClass = ctl(`
      ${Styles["blui-toggle-root"]}
      ${
        checked
          ? Styles[`blui-toggle__checked--${variant}`]
          : Styles[`blui-toggle--${variant}`]
      }
      ${size && Styles[`blui-toggle-size--${size}`]}
      ${className}
    `);

    const toggleClass = ctl(`
      ${Styles["blui-toggle"]}
      ${checked ? Styles[`blui-toggle-translate--${size}`] : "translate-x-0"}
      ${size && Styles[`blui-toggle-size--${size}`]}
      ${toggleClassName}
    `);

    return (
      <Switch.Group>
        {label && <Switch.Label className="sr-only">{label}</Switch.Label>}

        <Switch
          as={Element as any}
          ref={ref}
          checked={checked}
          onChange={onCheckedChange}
          className={rootClass}
        >
          <span aria-hidden="true" className={toggleClass} />
        </Switch>
      </Switch.Group>
    );
  }
);
