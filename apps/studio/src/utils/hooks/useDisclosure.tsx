import { useState, useCallback } from "react";

export type DisclosureOptions = {
  /**
   * The default disclosure open state
   * @default false
   */
  defaultIsOpen?: boolean;
};

const DEFAULT_OPTIONS: DisclosureOptions = {
  defaultIsOpen: false,
};

/**
 * Provides methods to control the state of a `toggle` component,
 * and it's current toggle state.
 *
 * @param options {DisclosureOptions} - Custom options
 * @returns `{ isOpen, onOpen, onClose, onToggle }`
 */
export default function useDisclosure(
  options: DisclosureOptions = DEFAULT_OPTIONS
) {
  const [isOpenState, setIsOpen] = useState(options.defaultIsOpen);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => {
    const action = isOpenState ? onClose : onOpen;

    action();
  }, [isOpenState, onOpen, onClose]);

  return { isOpen: !!isOpenState, onOpen, onClose, onToggle };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
