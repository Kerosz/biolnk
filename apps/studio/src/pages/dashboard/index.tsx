import DashboardLayout from "~/components/layouts/DashboardLayout";
import LinkDraggableList from "~/components/dashboard/LinkDraggableList";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Button, Flex, Plus } from "@biolnk/ui";
import { useAppContext } from "~/data/context";
import { memo } from "react";

function LinksScreen() {
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

      <LinkDraggableList />
    </DashboardLayout>
  );
}

export default withAuthCheck(memo(LinksScreen));
