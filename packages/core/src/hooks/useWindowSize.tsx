import useSafeLayoutEffect from "./useSafeLayoutEffect";
import { useState, useRef } from "react";
import { isBrowser } from "../utils/dom";

export type SizeValues = {
  width: number;
  height: number;
};

export type WindowSizeOptions = {
  /**
   * Used to watch the window for changes
   * @default true
   */
  observe?: boolean;
};

const DEFAULT_OPTIONS: WindowSizeOptions = {
  observe: true,
};

function _getWindowSize(): SizeValues {
  return isBrowser
    ? { width: window.innerWidth, height: window.innerHeight }
    : { width: 0, height: 0 };
}

/**
 * Used to get the window current `width` and `hight`. By default the hook is set
 * to watch changes on the `window` object. This behavior can be turned off by
 * setting `options.observe` to `false`.
 *
 * @param options {WindowSizeOptions} - Custom options
 * @returns {SizeValues}
 *
 * @example
 * const { width, height } = useWindowSize({ observe: false });
 */
export default function useWindowSize(
  options: WindowSizeOptions = DEFAULT_OPTIONS
): SizeValues {
  const [windowSize, setWindowSize] = useState<SizeValues>(_getWindowSize());
  const requestAnimationIDRef = useRef<number | null>(null);

  function handleSize() {
    if (isBrowser) {
      requestAnimationIDRef.current = window.requestAnimationFrame(() => {
        setWindowSize(_getWindowSize());
      });
    }
  }

  useSafeLayoutEffect(() => {
    if (options.observe) {
      window.addEventListener("resize", handleSize);
    }

    return () => {
      if (options.observe) {
        window.removeEventListener("resize", handleSize);
      }

      if (requestAnimationIDRef.current) {
        window.cancelAnimationFrame(requestAnimationIDRef.current);
      }
    };
  }, [options.observe]);

  return windowSize;
}
