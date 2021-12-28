import useDisclosure from "~/utils/hooks/useDisclosure";
import { createContext, ReactNode, useContext } from "react";
import { isUndefined } from "@biolnk/utils";

export type AppContextState = {
  openAddLinkDialog: () => void;
  closeAddLinkDialog: () => void;
  isAddLinkDialogOpen: boolean;
};

export type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppContextProvider({ children }: AppProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value: AppContextState = {
    openAddLinkDialog: onOpen,
    closeAddLinkDialog: onClose,
    isAddLinkDialogOpen: isOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (isUndefined(ctx)) {
    throw new Error("AppContext must be used within the 'AppContextProvider'");
  }

  return ctx;
}
