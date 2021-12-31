import DashboardLayout from "~/components/layouts/DashboardLayout";
import ComingSoon from "~/components/ComingSoon";
import withAuthCheck from "~/utils/HOC/withAuthCheck";

function AnalyticsScreen() {
  return (
    <DashboardLayout>
      <ComingSoon />
    </DashboardLayout>
  );
}

export default withAuthCheck(AnalyticsScreen);
