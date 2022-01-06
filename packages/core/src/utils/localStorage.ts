import { isBrowser } from "./dom";

/**
 * Parses and gets an item from `localStorage`
 * @param key Key of the item
 * @returns the value or null
 */
export function get(key: string): any | null {
  if (!isBrowser) {
    throw new Error(`localStorage cannot be used outside the browser`);
  }

  const storageItem = window.localStorage.getItem(key);

  return storageItem ? JSON.parse(storageItem) : null;
}

/**
 * Checks to see if an item is in `localStorage`
 * @param key Key of the item
 * @returns {boolean} true or false
 */
export function has(key: string): boolean {
  if (isBrowser) {
    throw new Error(`localStorage cannot be used outside the browser`);
  }

  const storageItem = window.localStorage.getItem(key);

  return !!storageItem;
}

/**
 * Parses and saves an item into the `localStorage`
 * @param key Key of the item
 * @param value Value to be saved
 * @returns {boolean} true
 */
export function set(key: string, value: unknown): boolean {
  if (!isBrowser) {
    throw new Error(`localStorage cannot be used outside the browser`);
  }

  const parsedValue = JSON.stringify(value);

  window.localStorage.setItem(key, parsedValue);

  return true;
}

/**
 * Removes an item from `localStorage` if it exists
 * @param key Key of the item
 */
export function remove(key: string): void {
  if (!isBrowser) {
    throw new Error(`localStorage cannot be used outside the browser`);
  }
  window.localStorage.removeItem(key);
}
