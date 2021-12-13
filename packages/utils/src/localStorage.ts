import { isBrowser } from "./dom";

/**
 * Parses and gets an item from `localStorage`
 * @param key Key of the item
 * @returns the value or null
 */
export function get(key: string): any | null {
  if (isBrowser) {
    const storageItem = window.localStorage.getItem(key);

    return storageItem ? JSON.parse(storageItem) : null;
  }
  throw new Error(`localStorage cannot be used outside the browser`);
}

/**
 * Checks to see if an item is in `localStorage`
 * @param key Key of the item
 * @returns {boolean} true or false
 */
export function has(key: string): boolean {
  if (isBrowser) {
    const storageItem = window.localStorage.getItem(key);

    return !!storageItem;
  }
  throw new Error(`localStorage cannot be used outside the browser`);
}

/**
 * Parses and saves an item into the `localStorage`
 * @param key Key of the item
 * @param value Value to be saved
 * @returns {boolean} true
 */
export function set(key: string, value: unknown): boolean {
  if (isBrowser) {
    const parsedValue = JSON.stringify(value);

    window.localStorage.setItem(key, parsedValue);

    return true;
  }
  throw new Error(`localStorage cannot be used outside the browser`);
}

/**
 * Removes an item from `localStorage` if it exists
 * @param key Key of the item
 */
export function remove(key: string): void {
  if (isBrowser) {
    window.localStorage.removeItem(key);
  }
  throw new Error(`localStorage cannot be used outside the browser`);
}
