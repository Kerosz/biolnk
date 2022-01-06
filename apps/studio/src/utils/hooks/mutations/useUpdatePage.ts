import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { updatePage } from "~/services/supabase";
import type { UpdatePageDto } from "~/types";

type UpdatePageMutationArgs = {
  data: UpdatePageDto;
  userId: string;
};

export default function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, userId }: UpdatePageMutationArgs) => {
      return updatePage(data, userId);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("page");
      },
      onSuccess: () =>
        makeToast({
          duration: 2500,
          kind: "success",
          title: "Successfully updated",
          message: "The page has been successfully updated!",
        }),
    }
  );
}
