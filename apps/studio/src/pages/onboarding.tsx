import OnboardingForm from "~/components/OnboardingForm";
import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { useRouter } from "next/router";
import { useUpdateEffect } from "@biolnk/core";
import { SimplePageLayout } from "~/components/layouts";
import { Routes } from "~/data/enums";

function OnboardingPage() {
  const { user, isLoading } = useUser();
  const { prefetch } = useRouter();

  useUpdateEffect(() => {
    prefetch(Routes.DASHBOARD);
  }, [user]);

  if (!user || isLoading) {
    return <span>loading</span>;
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
