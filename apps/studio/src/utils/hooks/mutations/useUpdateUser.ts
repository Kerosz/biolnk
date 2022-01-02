import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/ui";
import { updateUser } from "~/services/supabase";
import type { UpdateUserDto } from "~/types";

type UpdateUserMutationArgs = {
  data: UpdateUserDto;
  userId: string;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, userId }: UpdateUserMutationArgs) => {
      return updateUser(data, userId);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("page");
      },
      onSuccess: () =>
        makeToast({
          duration: 2500,
          kind: "success",
          title: "Successfully updated",
          message: "User has been successfully updated!",
        }),
    }
  );
}
