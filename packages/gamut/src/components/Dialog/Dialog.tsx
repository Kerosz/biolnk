import React, { forwardRef, Fragment } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Flex } from "../Flex/Flex";
import { Button } from "../Button";
import { X } from "react-feather";
import {
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from "@/types";

import Styles from "./Dialog.module.css";

export interface DialogOwnProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions: React.ReactNode;
}

export type DialogProps<C extends React.ElementType> = PolymorphicPropsWithRef<
  DialogOwnProps,
  C
>;

const DEFAULT_TAG = "div";

/**
 * UI `atom` level component for rendering a `<Dialog />`
 *
 * @component
 * @example
 * return (
 *    <Dialog
 *      title="My Dialog"
 *      open={isOpen}
 *      onClose={handleClose}
 *    >
 *      My Dialog
 *    </Dialog>
 * )
 */
const DialogMenu = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      open,
      onClose,
      title,
      actions,
      children,
    }: PolymorphicPropsWithoutRef<DialogOwnProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_TAG;

    return (
      <Transition appear show={open} as={Fragment}>
        <HeadlessDialog
          as={Element as any}
          className={Styles["blui-dialog__root"]}
          onClose={onClose}
        >
          <div className={Styles["blui-dialog__overlay--container"]}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessDialog.Overlay
                className={Styles["blui-dialog__overlay"]}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className={Styles["blui-dialog__hidden--element"]}
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={Styles["blui-dialog"]} ref={ref}>
                <Flex justify="between" align="center" className="px-6">
                  <HeadlessDialog.Title
                    as="h3"
                    className={Styles["blui-dialog--title"]}
                  >
                    {title}
                  </HeadlessDialog.Title>

                  <Button
                    variant="text"
                    size="xs"
                    icon={X}
                    iconProps={{ size: "xl" }}
                    onClick={onClose}
                  />
                </Flex>

                <div className={Styles["blui-dialog--child"]}>{children}</div>

                {actions}
              </div>
            </Transition.Child>
          </div>
        </HeadlessDialog>
      </Transition>
    );
  }
);

export type DialogCompoundType = typeof DialogMenu & {
  Button: typeof Button;
};

const _Compound = DialogMenu as DialogCompoundType;

_Compound.Button = Button;
_Compound.displayName = "DialogUIComponent";

export { _Compound as Dialog };
