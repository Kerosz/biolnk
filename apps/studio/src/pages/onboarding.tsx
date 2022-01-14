import OnboardingForm from "~/components/OnboardingForm";
import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { useRouter } from "next/router";
import { useSafeLayoutEffect, getPageLink, isBrowser } from "@biolnk/core";
import { Loading } from "@biolnk/gamut";
import { SimplePageLayout } from "~/components/layouts";
import { Routes } from "~/data/enums";

function OnboardingPage() {
  const { user, isLoading } = useUser();
  const { prefetch } = useRouter();

  const [_0, pageUrlPathType] = getPageLink(user?.username, "PATH");
  const [_1, pageUrlSubdomainType] = getPageLink(user?.username, "SUBDOMAIN");

  // Prefetching dashboard as that is the page user will be redirected to
  useSafeLayoutEffect(() => {
    if (user) {
      prefetch(Routes.DASHBOARD);
    }
  }, [user]);

  /**
   * Fetching the user page [this is not used directly] for both "PATH" and "SUBDOMAIN"
   * triggers nextjs ISR so the page will be ready without the user
   * having to load the page for the first time
   */
  useSafeLayoutEffect(() => {
    if (isBrowser && pageUrlPathType && pageUrlSubdomainType) {
      window.fetch(pageUrlPathType);
      window.fetch(pageUrlSubdomainType);
    }
  }, [pageUrlPathType, pageUrlSubdomainType]);

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <SimplePageLayout
      title="Complete your profile"
      seoOptions={{
        title: "Onboarding",
        noindex: true,
      }}
    >
      <OnboardingForm user={user} />
    </SimplePageLayout>
  );
}

export default withAuthCheck(OnboardingPage);
