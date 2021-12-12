import { useCallback, useEffect, useState } from "react";
import { isBrowser, storage } from "@biolnk/utils";

export enum ThemeMode {
  DARK = "dark",
  LIGHT = "light",
}
export type ThemeModeType = `${ThemeMode}`;

const THEME_KEY = "dark-theme";
const THEME_CLASS = "dark";

export default function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleTheme = useCallback((themeMode: ThemeModeType) => {
    if (isBrowser) {
      if (themeMode === ThemeMode.DARK) {
        document.documentElement.classList.add(THEME_CLASS);

        storage.set(THEME_KEY, true);
        setIsDark(true);
      } else {
        document.documentElement.classList.remove(THEME_CLASS);

        storage.set(THEME_KEY, false);
        setIsDark(false);
      }
    } else {
      throw new Error("Theme cannot be used outside the browser!");
    }
  }, []);

  useEffect(() => {
    const storageTheme = storage.get(THEME_KEY);

    if (storageTheme === null) {
      storage.set(THEME_KEY, true);
    }

    if (storageTheme && isBrowser) {
      document.documentElement.classList.add(THEME_CLASS);
    }
  }, []);

  return { toggle: toggleTheme, isDark, isLight: !isDark };
}
