import DashboardLayout from "~/components/layout/DashboardLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Routes } from "~/data/enums/routes";
import { useSupabase } from "~/lib/supabase";

export default function HomePage() {
  const { isAuthenticated } = useSupabase();
  const router = useRouter();

  /**
   * @TODO
   * 1. Use middleware or next 'api' to enable route redirects on SSR
   * 2. Have a coming soon component to display
   */
  useEffect(() => {
    if (!isAuthenticated) router.replace(Routes.SIGNIN);
    if (isAuthenticated) router.replace(Routes.DASHBOARD);
  }, []);

  return null;
}
