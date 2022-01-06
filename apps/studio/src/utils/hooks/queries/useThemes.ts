import { useQuery } from "react-query";
import { getThemes } from "~/services/supabase";
import type { Theme } from "@biolnk/core";

export default function useThemes() {
  const { data, ...methods } = useQuery<Theme[]>("themes", () => getThemes(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  return { themes: data, ...methods };
}
