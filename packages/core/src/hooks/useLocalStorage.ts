import { Dispatch, SetStateAction, useState } from "react";
import { isBrowser, isFunction, storage } from "..";

export type SetValue<T> = Dispatch<SetStateAction<T>> | T;

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = (): T => {
    if (!isBrowser) return initialValue;

    try {
      const storageItem = storage.get<T>(key);

      return storageItem ?? initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);

      return initialValue;
    }
  };

  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = (value) => {
    if (!isBrowser) return false;

    try {
      const valueToStore = isFunction(value) ? value(storedValue) : value;

      setStoredValue(valueToStore);
      storage.set(key, valueToStore);

      return true;
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
      return false;
    }
  };

  return [storedValue, setValue] as const;
}
