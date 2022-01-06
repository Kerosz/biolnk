import useUser from "~/utils/hooks/queries/useUser";
import { useSafeLayoutEffect } from "@biolnk/core";
import { ComponentType, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "@biolnk/gamut";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";

const withAuthCheck = <Props,>(WrappedComponent: ComponentType<Props>) => {
  const Component = (props: Props) => {
    // allow access to these pages with no additional auth checks
    const PAGE_WHITELIST = [Routes.SIGNIN, Routes.SIGNUP];

    const [isConnecting, setConnecting] = useState<boolean>(true);

    const { isReady, replace, pathname } = useRouter();
    const { isAuthenticated } = useSupabase();
    const { isLoading, isError, user } = useUser();

    const isEntryPage = pathname === Routes.ENTRY;
    const isSignUpPage = pathname === Routes.SIGNUP;
    // pages that you need to be auth to acess
    const isBlacklisted = !PAGE_WHITELIST.includes(pathname as any);

    useSafeLayoutEffect(() => {
      // no user and blacklisted -> redirect to signin
      if ((!isAuthenticated || isError) && isBlacklisted && isReady) {
        replace(Routes.SIGNIN).then(() => setConnecting(false));
      }
    }, [isAuthenticated, isError, isReady]);

    useSafeLayoutEffect(() => {
      // entry page or signup page and user -> redirect to dashboard
      if ((isEntryPage || isSignUpPage) && isAuthenticated && isReady) {
        replace(Routes.DASHBOARD);
      }

      // user -> stop loading
      if (!isLoading && user && isAuthenticated && isReady) {
        setConnecting(false);
      }
    }, [isLoading, user, isAuthenticated, isReady]);

    if (isConnecting && isBlacklisted) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuthCheck;
