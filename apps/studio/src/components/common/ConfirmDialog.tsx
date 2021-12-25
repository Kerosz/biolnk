import React, { ReactNode } from "react";
import { Dialog, Flex } from "@biolnk/ui";

export interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title?: string;
  message: string | ReactNode;
  confirmText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm",
  confirmText = "Delete",
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
            onClick={onConfirm}
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
