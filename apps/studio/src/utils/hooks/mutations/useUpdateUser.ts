import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { updateAuthEmail, updateUser, uploadAvatar } from "~/services/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import type { UpdateUserDto } from "~/types";

type UpdateUserMutationArgs = {
  data: UpdateUserDto;
  userId: string;
  newEmail?: string | null;
  newAvatar?: File | null;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ data, userId, newEmail, newAvatar }: UpdateUserMutationArgs) => {
      if (newEmail) {
        await updateAuthEmail(newEmail);
      }

      if (newAvatar) {
        const avatarPath = `${userId}/${Date.now()}.png`;
        const storagePath = await uploadAvatar(avatarPath, newAvatar);

        data.avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${storagePath}`;
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
