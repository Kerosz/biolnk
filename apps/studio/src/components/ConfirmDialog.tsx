import React, { ReactNode } from "react";
import { Dialog, Flex } from "@biolnk/gamut";

export interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  message: string | ReactNode;
  title?: string;
  confirmText?: string;
  loading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm",
  confirmText = "Delete",
  loading = false,
  message,
}) => {
  return (
    <Dialog
      title={title}
      open={open}
      onClose={onClose}
      actions={
        <Flex>
          <Dialog.Button
            variant="text"
            size="xl"
            rounded={false}
            block
            className="!bg-mauve-200 hover:!bg-mauve-300"
            onClick={onClose}
          >
            Cancel
          </Dialog.Button>
          <Dialog.Button
            variant="colored"
            size="xl"
            rounded={false}
            block
            className="!bg-red-800 hover:!bg-red-900 active:!bg-red-800"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Dialog.Button>
        </Flex>
      }
    >
      <div className="text-mauve-950">{message}</div>
    </Dialog>
  );
};

export default ConfirmDialog;
