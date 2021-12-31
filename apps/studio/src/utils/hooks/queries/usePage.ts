import { useQuery } from "react-query";
import { sbClient } from "~/lib/supabase";
import { getPageWithMetadata } from "~/services/supabase";
import { PageWithMetadata } from "~/types";

export default function usePage() {
  const authUser = sbClient.auth.user();

  const { data, ...methods } = useQuery<PageWithMetadata>(
    "page",
    () => {
      // don't make a call if the `ID` does't exist
      if (!authUser?.id) return;

      return getPageWithMetadata(authUser?.id);
    },
    { refetchOnWindowFocus: false, refetchInterval: false }
  );

  return { page: data, ...methods };
}
