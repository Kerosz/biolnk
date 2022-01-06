import React, { FC, ReactNode } from "react";
import toast, { Toaster, Toast, ToastOptions } from "react-hot-toast";
import BaseIcon from "../BaseIcon";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Icon,
  Info,
} from "react-feather";
import { ctl } from "@biolnk/core";

import Styles from "./Toast.module.css";

export interface ToastOwnProps {
  title: string;
  message: string;
  kind?: ToastKind;
  onComplete?: () => void;
  customIcon?: ReactNode | null;
}

export type MakeToastOptions = ToastOptions & ToastOwnProps;
export type ToastProps = Partial<Toast> & ToastOwnProps;
type ToastKind = "success" | "warning" | "info" | "error" | "default";
type ToastIconMap = {
  [Key in ToastKind]: Icon;
};

const Toast: FC<ToastProps> = ({
  kind = "default",
  visible,
  id,
  title,
  message,
  onComplete,
  customIcon = null,
}) => {
  const rootClass = ctl(`
    ${visible ? "animate-enter" : "animate-leave"}
    ${Styles["blui-toast"]}
  `);

  const textContainerClass = ctl(`
    ${Styles["blui-toast-container__icon"]}
    ${Styles[`blui-toast-text__color--${kind}`]}
  `);

  const ICONS_MAP: ToastIconMap = {
    default: Info,
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle,
  };

  return (
    <div role="alert" className={rootClass}>
      <div className="flex-1 w-0">
        <div className="flex items-start h-full">
          <div className={textContainerClass}>
            {customIcon ? (
              customIcon
            ) : (
              <BaseIcon icon={ICONS_MAP[kind]} size="2xl" />
            )}
          </div>
          <div className={Styles["blui-toast-container__text"]}>
            <span className="block font-medium text-mauve-1000">{title}</span>
            <span className="block mt-1 text-sm text-mauve-950">{message}</span>

            <div className={Styles["blui-toast-actions--mobile"]}>
              {onComplete && (
                <button
                  type="button"
                  onClick={onComplete}
                  className={`${Styles["blui-toast-btn"]} font-medium`}
                >
                  Details
                </button>
              )}
              <button
                type="button"
                onClick={() => toast.dismiss(id)}
                className={Styles["blui-toast-btn"]}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles["blui-toast-actions--desktop"]}>
        {onComplete && (
          <button
            type="button"
            onClick={onComplete}
            className={`${Styles["blui-toast-btn"]} font-medium px-4`}
          >
            Details
          </button>
        )}
        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          className={`${Styles["blui-toast-btn"]} px-4`}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export const makeToast = ({
  onComplete,
  title,
  message,
  kind,
  customIcon,
  ...toasterOptions
}: MakeToastOptions) => {
  toast.custom(
    ({ visible, id }) => (
      <Toast
        id={id}
        kind={kind}
        customIcon={customIcon}
        onComplete={onComplete}
        title={title}
        message={message}
        visible={visible}
      />
    ),
    toasterOptions
  );
};

export { Toaster };
