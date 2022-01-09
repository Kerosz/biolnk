import ComingSoon from "~/components/ComingSoon";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { DashboardLayout } from "~/components/layouts";

function AnalyticsScreen() {
  return (
    <DashboardLayout seoOptions={{ title: "Stats" }}>
      <ComingSoon />
    </DashboardLayout>
  );
}

export default withAuthCheck(AnalyticsScreen);
