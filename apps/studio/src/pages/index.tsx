import { useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";
import { useSupabase } from "~/lib/supabase";
import Header from "~/components/common/Header/Header";

export default function HomePage() {
  const { isAuthenticated } = useSupabase();
  const router = useRouter();

  /**
   * @TODO
   * use middleware or next 'api' to enable route redirects on SSR
   */
  useEffect(() => {
    if (!isAuthenticated) router.replace(Routes.SIGNIN);
  }, []);

  return (
    <>
      <Header />
      <Text size="lg">Studio</Text>
    </>
  );
}
