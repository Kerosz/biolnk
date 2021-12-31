import DashboardLayout from "~/components/layouts/DashboardLayout";
import PageSeoForm from "~/components/dashboard/PageSeoForm";
import SectionShell from "~/components/dashboard/SectionShell";
import PageProfileForm from "~/components/dashboard/PageProfileForm";
import ThemeList from "~/components/dashboard/ThemeList";
import usePage from "~/utils/hooks/queries/usePage";
import useThemes from "~/utils/hooks/queries/useThemes";
import withAuthCheck from "~/utils/HOC/withAuthCheck";

function PageScreen() {
  const { page } = usePage();
  const { themes } = useThemes();

  return (
    <DashboardLayout>
      <SectionShell title="Profile">
        {page ? <PageProfileForm page={page} /> : "loading..."}
      </SectionShell>

      <SectionShell title="SEO">
        {page ? <PageSeoForm page={page} /> : "loading..."}
      </SectionShell>

      <SectionShell title="Themes">
        {page && themes ? (
          <ThemeList page={page} themes={themes} />
        ) : (
          "loading..."
        )}
      </SectionShell>
    </DashboardLayout>
  );
}

export default withAuthCheck(PageScreen);
