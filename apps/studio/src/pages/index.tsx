import DashboardLayout from "~/components/layout/DashboardLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@biolnk/ui";
import { Routes } from "~/data/enums/routes";
import { useSupabase } from "~/lib/supabase";

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
    <DashboardLayout>
      <Text size="lg">Dash</Text>
    </DashboardLayout>
  );
}
