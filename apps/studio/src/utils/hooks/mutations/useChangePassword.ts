import { useMutation } from "react-query";
import { makeToast } from "@biolnk/ui";
import { changePassword } from "~/services/supabase";
import { ChangePasswordDto } from "~/types";
import { PostgrestError } from "@supabase/supabase-js";

export default function useChangePassword() {
  return useMutation(
    (changePasswordDto: ChangePasswordDto) => {
      return changePassword(changePasswordDto);
    },
    {
      onSuccess: () =>
        makeToast({
          duration: 2500,
          kind: "success",
          title: "Successfully updated",
          message: "Your password has been successfully changed!",
        }),
      onError: (error: PostgrestError) =>
        makeToast({
          duration: 2500,
          kind: "error",
          title: "Something went wrong",
          message: error.message,
        }),
    }
  );
}
