import { useMutation } from "react-query";
import { reorderLinks } from "~/services/supabase";
import { Link, ReorderLinkDto } from "~/types";

export default function useReorderLink() {
  return useMutation((linkList: Link[]) => {
    const reorderList: ReorderLinkDto[] = linkList.map(
      ({ id, display_order }) => ({ id, display_order })
    );

    return reorderLinks(reorderList);
  });
}
