import usePage from "~/utils/hooks/queries/usePage";
import useThemes from "~/utils/hooks/queries/useThemes";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { DashboardLayout } from "~/components/layouts";
import {
  PageSeoForm,
  SectionShell,
  PageProfileForm,
  ThemeList,
  ThemeListSkeleton,
} from "~/components/dashboard";

function PageScreen() {
  const { page } = usePage();
  const { themes } = useThemes();

  return (
    <DashboardLayout seoOptions={{ title: "Page" }}>
      <SectionShell title="Profile">
        <PageProfileForm page={page} />
      </SectionShell>

      <SectionShell title="SEO">
        <PageSeoForm page={page} />
      </SectionShell>

      <SectionShell title="Themes">
        {page && themes ? (
          <ThemeList page={page} themes={themes} />
        ) : (
          <ThemeListSkeleton />
        )}
      </SectionShell>
    </DashboardLayout>
  );
}

export default withAuthCheck(PageScreen);
