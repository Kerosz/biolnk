import { Link } from "~/types";

export const getLinksWithOrder = (list: Link[]) => {
  /**
   * When inserted in the DB the order defaults to 9999
   * we sort items on the order in case there was any
   * updates after they were inserted, and re-assign the order
   *
   * NOTE: We can assume that no user will have more than
   * 100-200 links at most
   */
  const orderedList: Link[] = list
    .sort((a, b) => a.display_order - b.display_order)
    .map((link, idx) => ({ ...link, display_order: idx }));

  return orderedList;
};

export const reorderList = (list: Link[], startIdx: number, endIdx: number) => {
  let listClone = Array.from(list);

  // Taking the item [source] that we want to reorder out of the list
  const [sourceLink] = listClone.splice(startIdx, 1);

  // Placing the item we took out [source] instead of the item that we swapped
  listClone.splice(endIdx, 0, sourceLink);

  // Reordering the items swapped in the list
  listClone = listClone.map((link, idx) => ({
    ...link,
    display_order: idx,
  }));

  return listClone;
};
