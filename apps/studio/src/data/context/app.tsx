import useDisclosure, {
  UseDisclosureReturn,
} from "~/utils/hooks/useDisclosure";
import { makeContext } from "~/utils/makeContext";
import { ReactNode } from "react";

export type AppContextState = {
  addLinkDialog: UseDisclosureReturn;
};

export type AppProviderProps = {
  children: ReactNode;
};

const [AppContext, Provider, useAppContext] =
  makeContext<AppContextState>("AppContext");

function AppContextProvider({ children }: AppProviderProps) {
  const addLinkDialog = useDisclosure();

  const value: AppContextState = {
    addLinkDialog,
  };

  return <Provider value={value}>{children}</Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
