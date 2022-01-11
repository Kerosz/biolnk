import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { SimplePageLayout } from "~/components/layouts";
import OnboardingForm from "~/components/OnboardingForm";

function OnboardingPage() {
  const { user, isLoading } = useUser();

  if (!user || isLoading) {
    return <span>loading</span>;
  }

  return (
    <SimplePageLayout title="Complete your profile">
      <OnboardingForm user={user} />
    </SimplePageLayout>
  );
}

export default withAuthCheck(OnboardingPage);
