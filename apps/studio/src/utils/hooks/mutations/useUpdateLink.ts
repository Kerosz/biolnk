import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { updateLink } from "~/services/supabase";
import type { UpdateLinkDto } from "~/types";

type UpdateLinkMutationArgs = {
  data: UpdateLinkDto;
  linkId: string;
};

export default function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, linkId }: UpdateLinkMutationArgs) => {
      return updateLink(data, linkId);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("links");
      },
      onSuccess: () =>
        makeToast({
          duration: 2500,
          kind: "success",
          title: "Successfully updated",
          message: "The link has been successfully updated!",
        }),
    }
  );
}
