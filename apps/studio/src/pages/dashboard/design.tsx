import DashboardLayout from "~/components/layout/DashboardLayout";
import ComingSoon from "~/components/ComingSoon";
import withAuthCheck from "~/utils/HOC/withAuthCheck";

function DesignPage() {
  return (
    <DashboardLayout>
      <ComingSoon />
    </DashboardLayout>
  );
}

export default withAuthCheck(DesignPage);
