import React, { forwardRef, Fragment } from "react";
import BaseIcon from "../BaseIcon";
import { Menu, Transition } from "@headlessui/react";
import { Button } from "../Button";
import { Menu as MenuIcon, Icon } from "react-feather";
import { ctl } from "@biolnk/core";
import type {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";

import Styles from "./Dropdown.module.css";

const DROPDOWN_DEFAULT_TAG = "div";
const LIST_ITEM_DEFAULT_TAG = "button";

export interface DropdownOwnProps {
  trigger?: React.ReactNode;
}

export interface DropdownListItemOwnProps {
  children?: React.ReactNode;
  icon?: Icon;
  rightIcon?: Icon;
}

export type DropdownProps<C extends React.ElementType> =
  PolymorphicPropsWithRef<DropdownOwnProps, C>;

export type DropdownListItemProps<C extends React.ElementType> =
  PolymorphicPropsWithRef<DropdownListItemOwnProps, C>;

const DropdownMenu = forwardRef(
  <C extends React.ElementType = typeof DROPDOWN_DEFAULT_TAG>(
    {
      trigger,
      as,
      children,
      ...otherProps
    }: PolymorphicPropsWithoutRef<DropdownOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DROPDOWN_DEFAULT_TAG;

    return (
      <Menu
        as={Element as any}
        className={Styles["blui-root"]}
        ref={ref}
        {...otherProps}
      >
        {trigger ? (
          <Menu.Button as={Fragment} children={trigger} />
        ) : (
          <Menu.Button as={Fragment}>
            <Button icon={MenuIcon} />
          </Menu.Button>
        )}

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={Styles["blui-menu--items"]}>
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

const DropdownListItem = forwardRef(
  <C extends React.ElementType = typeof LIST_ITEM_DEFAULT_TAG>(
    {
      children,
      as,
      icon,
      rightIcon,
      className,
      ...otherProps
    }: PolymorphicPropsWithoutRef<DropdownListItemOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? LIST_ITEM_DEFAULT_TAG;

    return (
      <Menu.Item>
        {({ active }) => {
          const listItemRootClass = ctl(`
            group
            ${Styles["blui-listItem"]}
            ${
              active
                ? Styles["blui-listItem--active"]
                : Styles["blui-listItem--inactive"]
            }
            ${className}
          `);

          return (
            <Element className={listItemRootClass} ref={ref} {...otherProps}>
              {icon && (
                <BaseIcon icon={icon} className={Styles["blui-icon--left"]} />
              )}
              {children}
              {rightIcon && (
                <BaseIcon
                  icon={rightIcon}
                  className={Styles["blui-icon--right"]}
                />
              )}
            </Element>
          );
        }}
      </Menu.Item>
    );
  }
);

const DropdownGroup = (props: React.ComponentProps<"div">) => {
  return <div className={Styles["blui-group"]} {...props} />;
};

export type DropdownCompoundType = typeof DropdownMenu & {
  Group: typeof DropdownGroup;
  ListItem: typeof DropdownListItem;
};

const _Compound = DropdownMenu as DropdownCompoundType;

_Compound.Group = DropdownGroup;
_Compound.ListItem = DropdownListItem;

export { _Compound as Dropdown };
