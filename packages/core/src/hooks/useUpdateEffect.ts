import { useRef, useEffect, EffectCallback, DependencyList } from "react";

/**
 * Accepts an imperative function, wraps React `useEffect` with the addition that it
 * will only run once on mount
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 */
export default function useUpdateEffect(
  effect: EffectCallback,
  deps: DependencyList
) {
  const mounted = useRef<boolean>(false);

  useEffect((...args) => {
    if (mounted.current) {
      effect(...args);
    } else {
      mounted.current = true;
    }
  }, deps);
}
