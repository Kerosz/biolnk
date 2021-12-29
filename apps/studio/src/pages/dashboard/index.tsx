import DashboardLayout from "~/components/layout/DashboardLayout";
import DraggableList from "~/components/dashboard/DraggableList";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Button, Flex, Plus } from "@biolnk/ui";
import { useAppContext } from "~/data/context";
import { memo } from "react";

function OverviewPage() {
  const { addLinkDialog } = useAppContext();

  return (
    <DashboardLayout>
      <Flex justify="end" className="flex-col-reverse xs:flex-row">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={addLinkDialog.onOpen}
          uppercase
        >
          Add link
        </Button>
      </Flex>

      <DraggableList />
    </DashboardLayout>
  );
}

export default withAuthCheck(memo(OverviewPage));
