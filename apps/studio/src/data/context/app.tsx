import { makeContext, useDisclosure, UseDisclosureReturn } from "@biolnk/core";
import type { ReactNode } from "react";

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
