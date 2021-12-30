import DashboardLayout from "~/components/layouts/DashboardLayout";

import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Heading } from "@biolnk/ui";
import PageSeoForm from "~/components/design/PageSeoForm";
import SectionShell from "~/components/design/SectionShell";

function DesignPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <SectionShell title="Page">
          <PageSeoForm />
        </SectionShell>

        <SectionShell title="Themes">themes</SectionShell>
      </div>
    </DashboardLayout>
  );
}

export default withAuthCheck(DesignPage);
