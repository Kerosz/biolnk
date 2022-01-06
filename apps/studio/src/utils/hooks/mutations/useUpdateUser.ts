import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { updateAuthEmail, updateUser } from "~/services/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import type { UpdateUserDto } from "~/types";

type UpdateUserMutationArgs = {
  data: UpdateUserDto;
  userId: string;
  newEmail?: string | null;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ data, userId, newEmail }: UpdateUserMutationArgs) => {
      if (newEmail) {
        await updateAuthEmail(newEmail);
      }

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
      onError: (error: PostgrestError) =>
        makeToast({
          duration: 2500,
          kind: "error",
          title: "Error",
          message: error.message,
        }),
    }
  );
}
