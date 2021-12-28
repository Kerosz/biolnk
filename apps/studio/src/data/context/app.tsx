import useDisclosure from "~/utils/hooks/useDisclosure";
import { makeContext } from "~/utils/makeContext";
import { ReactNode } from "react";

export type AppContextState = {
  openAddLinkDialog: () => void;
  closeAddLinkDialog: () => void;
  isAddLinkDialogOpen: boolean;
};

export type AppProviderProps = {
  children: ReactNode;
};

const [AppContext, Provider, useAppContext] =
  makeContext<AppContextState>("AppContext");

function AppContextProvider({ children }: AppProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value: AppContextState = {
    openAddLinkDialog: onOpen,
    closeAddLinkDialog: onClose,
    isAddLinkDialogOpen: isOpen,
  };

  return <Provider value={value}>{children}</Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
