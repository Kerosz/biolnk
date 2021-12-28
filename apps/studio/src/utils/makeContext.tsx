import { createContext, useContext } from "react";
import { isUndefined } from "@biolnk/utils";

const _getGenericContext = <State,>(displayName: string) => {
  const CTX = createContext<State | undefined>(undefined);
  CTX.displayName = displayName;

  return CTX;
};

/**
 * Function used to generate a generic context, it returns a tuple containing
 * the `context`, the `provider` and a hook `useContext`
 *
 * @example
 * const [AppContext, AppContextProvider, useAppContext] = makeContext("AppContext");
 *
 * @param displayName React Component display name
 * @returns `[Context, Provider, useContext]`
 */
export const makeContext = <ContextState,>(displayName: string) => {
  const GenericCTX = _getGenericContext<ContextState>(displayName);

  const useGenericContext = () => {
    const CTX = useContext(GenericCTX);

    if (isUndefined(CTX)) {
      throw new Error(
        `Context ${displayName} must be used within a provider, consider wrapping a parent with '${displayName}Provider'`
      );
    }

    return CTX;
  };

  return [GenericCTX, GenericCTX.Provider, useGenericContext] as const;
};
