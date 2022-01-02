import ChangePasswordSection from "~/components/account/ChangePasswordSection";
import GeneralSection from "~/components/account/GeneralSection";
import PreferenceSection from "~/components/account/PreferenceSection";
import SecuritySection from "~/components/account/SecuritySection";
import AccountLayout from "~/components/layouts/AccountLayout";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import usePage from "~/utils/hooks/queries/usePage";

function AccountPage() {
  const { page, isLoading } = usePage();

  if (isLoading) {
    return <AccountLayout>loading</AccountLayout>;
  }

  return (
    <AccountLayout>
      <GeneralSection page={page} />
      <PreferenceSection page={page} />
      <ChangePasswordSection />
      <SecuritySection {...page.user} />
    </AccountLayout>
  );
}

export default withAuthCheck(AccountPage);
