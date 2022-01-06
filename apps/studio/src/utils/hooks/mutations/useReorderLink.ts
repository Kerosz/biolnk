import { useMutation, useQueryClient } from "react-query";
import { reorderLinks } from "~/services/supabase";
import { ReorderLinkDto } from "~/types";
import type { Link } from "@biolnk/core";

export default function useReorderLink() {
  const queryClient = useQueryClient();

  return useMutation(
    (linkList: Link[]) => {
      const reorderList: ReorderLinkDto[] = linkList.map(
        ({ id, display_order }) => ({ id, display_order })
      );

      return reorderLinks(reorderList);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("links");
      },
    }
  );
}
