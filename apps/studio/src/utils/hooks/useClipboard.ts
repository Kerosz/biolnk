import { useCallback, useEffect, useState } from "react";
import { isBrowser } from "@biolnk/utils";

type CopyStatus = "Copy" | "Copied";
type CopySignature = (copyValue: string) => Promise<boolean>; // Return success
type ClipboardOptions = {
  /**
   * initial value for the clipboard state
   * @default "Copy"
   */
  initialState?: CopyStatus | string;
  /**
   * timeout delay (in ms) to switch back to initial state once copied
   * @default 3000
   */
  delayMs?: number;
};

const DEFAULT_OPTIONS: ClipboardOptions = {
  initialState: "Copy",
  delayMs: 3000,
};

/**
 * Provides a `copy` method to save a string in the `navigator clipboard`
 * and the copy `status`
 *
 * @param options {ClipboardOptions} - Custom options
 * @returns `[copyLabel, handleCopy]`
 */
export default function useClipboard(
  options: ClipboardOptions = DEFAULT_OPTIONS
) {
  const [copyLabel, setCopyLabel] = useState<CopyStatus | string>(
    options.initialState
  );

  const handleCopy: CopySignature = useCallback(async (copyValue) => {
    if (isBrowser && navigator?.clipboard) {
      try {
        /* clipboard successfully set */
        await navigator.clipboard.writeText(copyValue);
        setCopyLabel("Copied");

        return true;
      } catch (_error) {
        /* clipboard write failed */
        setCopyLabel("Failed to copy");

        return false;
      }
    }
  }, []);

  useEffect(() => {
    let timeoutID: number | null;

    if (copyLabel === "Copied") {
      timeoutID = window.setTimeout(() => {
        setCopyLabel("Copy");
      }, options.delayMs);
    }

    return () => {
      if (timeoutID) window.clearTimeout(timeoutID);
    };
  }, [copyLabel]);

  return [copyLabel, handleCopy] as const;
}

export type UseClipboardReturn = ReturnType<typeof useClipboard>;
