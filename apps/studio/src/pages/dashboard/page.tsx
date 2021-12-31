import DashboardLayout from "~/components/layouts/DashboardLayout";
import usePage from "~/utils/hooks/queries/usePage";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import PageSeoForm from "~/components/dashboard/PageSeoForm";
import SectionShell from "~/components/dashboard/SectionShell";
import PageProfileForm from "~/components/dashboard/PageProfileForm";

function PageScreen() {
  const { page } = usePage();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <SectionShell title="SEO">
          {page ? <PageSeoForm page={page} /> : "loading..."}
        </SectionShell>

        <SectionShell title="Profile">
          {page ? <PageProfileForm page={page} /> : "loading..."}
        </SectionShell>

        <SectionShell title="Themes">themes</SectionShell>
      </div>
    </DashboardLayout>
  );
}

export default withAuthCheck(PageScreen);
