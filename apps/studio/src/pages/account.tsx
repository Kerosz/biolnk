import withAuthCheck from "~/utils/HOC/withAuthCheck";
import usePage from "~/utils/hooks/queries/usePage";
import { AccountLayout } from "~/components/layouts";
import {
  ChangePasswordSection,
  GeneralSection,
  PreferenceSection,
  SecuritySection,
  AccountSkeleton,
} from "~/components/account";

function AccountPage() {
  const { page, isLoading } = usePage();

  if (isLoading) {
    return <AccountSkeleton />;
  }

  return (
    <AccountLayout>
      <GeneralSection user={page.user} />
      <PreferenceSection page={page} />
      <ChangePasswordSection />
      <SecuritySection user={page.user} />
    </AccountLayout>
  );
}

export default withAuthCheck(AccountPage);
