import { useCallback, useState } from "react";
import { isBrowser } from "@biolnk/utils";

type CopyStatus = "Copy" | "Copied";
type CopySignature = (copyValue: string) => Promise<boolean>; // Return success
type ClipboardOptions = {
  initialState?: CopyStatus | string;
  delayMs?: number;
};

/**
 * Provides a `copy` method to save a string in the `navigator clipboard`
 * and the copy `status`
 *
 * @default
 * initialState = "Copy"
 * delayMs = 3000
 *
 * @param options {ClipboardOptions} - Custom options
 * @returns `[copyLabel, handleCopy]`
 */
export default function useClipboard(
  options: ClipboardOptions = {
    initialState: "Copy",
    delayMs: 3000,
  }
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

        setTimeout(() => {
          setCopyLabel("Copy");
        }, options.delayMs);

        return true;
      } catch (_error) {
        /* clipboard write failed */
        setCopyLabel("Failed to copy");

        return false;
      }
    }
  }, []);

  return [copyLabel, handleCopy] as const;
}
