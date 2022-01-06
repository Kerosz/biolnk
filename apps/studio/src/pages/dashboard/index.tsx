import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { memo } from "react";
import { DashboardLayout } from "~/components/layouts";
import { LinkDraggableList } from "~/components/dashboard";
import { Button, Flex, Plus } from "@biolnk/gamut";
import { useAppContext } from "~/data/context";

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
