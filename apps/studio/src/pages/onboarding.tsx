import withAuthCheck from "~/utils/HOC/withAuthCheck";
import useUser from "~/utils/hooks/queries/useUser";

function OnboardingPage() {
  const { user, isLoading } = useUser();

  if (!user || isLoading) {
    return <span>loading</span>;
  }

  return <p>hello {user.username}</p>;
}

export default withAuthCheck(OnboardingPage);
