import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { deleteLink } from "~/services/supabase";

export default function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation((linkId: string) => deleteLink(linkId), {
    onSettled: () => {
      queryClient.invalidateQueries("links");
    },
    onSuccess: () =>
      makeToast({
        duration: 2600,
        kind: "success",
        title: "Successfully deleted",
        message: "The link has been successfully deleted!",
      }),
  });
}
