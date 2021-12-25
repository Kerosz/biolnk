import { useQuery } from "react-query";
import { sbClient } from "~/lib/supabase";
import { getLinksByUserId } from "~/services/supabase";
import type { Link } from "~/types";

export default function useLinks() {
  const authUser = sbClient.auth.user();

  const { data, ...methods } = useQuery<Link[]>("links", () => {
    // don't make a call if the `ID` does't exist
    if(!authUser?.id) return;

    return getLinksByUserId(authUser?.id)
  });

  return { links: data, ...methods }
}
