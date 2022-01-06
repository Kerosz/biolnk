import { useQuery } from "react-query";
import { sbClient } from "~/lib/supabase";
import { getUserById } from "~/services/supabase";
import type { User } from "@biolnk/core";

export default function useUser() {
  const authUser = sbClient.auth.user();

  const { data, ...methods } = useQuery<User>(
    "user",
    () => {
      // don't make a call if the `ID` does't exist
      if (!authUser?.id) return;

      return getUserById(authUser?.id);
    },
    { refetchOnWindowFocus: false, refetchInterval: false }
  );

  return { user: data, ...methods };
}
