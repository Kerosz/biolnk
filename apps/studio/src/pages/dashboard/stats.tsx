import ComingSoon from "~/components/ComingSoon";
import StatsGAForm from "~/components/dashboard/StatsGAForm";
import usePage from "~/utils/hooks/queries/usePage";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { DashboardLayout } from "~/components/layouts";
import { SectionShell } from "~/components/dashboard";

function AnalyticsScreen() {
  const { page } = usePage();

  return (
    <DashboardLayout seoOptions={{ title: "Stats" }}>
      <SectionShell title="Google Analytics">
        <StatsGAForm
          currentGATrackingId={page?.integrations.google_analytics_id}
        />
      </SectionShell>

      <SectionShell title="Insights">
        <ComingSoon size="md" showExtras={false} />
      </SectionShell>
    </DashboardLayout>
  );
}

export default withAuthCheck(AnalyticsScreen);
