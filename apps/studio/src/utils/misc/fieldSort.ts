type itemMap = (n: any) => any;

interface SortConfig<T> {
  key: keyof T;
  reverse?: boolean;
  map?: itemMap;
}

/**
 * Implementation found here
 * @see https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
 *
 * @example
 * interface Person {
 *   firstName: string;
 *   lastName: string;
 * }
 *
 * people.sort(fieldSort<Person>(['lastName','firstName']));
 */
export default function fieldSort<T extends object>(
  keys: (keyof T | SortConfig<T>)[]
): (a: T, b: T) => 0 | 1 | -1 {
  return function(a: T, b: T) {
    const firstKey: keyof T | SortConfig<T> = keys[0];
    const isSimple = typeof firstKey === "string";
    const key: keyof T = isSimple
      ? (firstKey as keyof T)
      : (firstKey as SortConfig<T>).key;
    const reverse: boolean = isSimple
      ? false
      : !!(firstKey as SortConfig<T>).reverse;
    const map: itemMap | null = isSimple
      ? null
      : (firstKey as SortConfig<T>).map || null;

    const valA = map ? map(a[key]) : a[key];
    const valB = map ? map(b[key]) : b[key];
    if (valA === valB) {
      if (keys.length === 1) {
        return 0;
      }
      return fieldSort<T>(keys.slice(1))(a, b);
    }
    if (reverse) {
      return valA > valB ? -1 : 1;
    }
    return valA > valB ? 1 : -1;
  };
}
