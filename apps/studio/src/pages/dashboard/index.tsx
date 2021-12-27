import DashboardLayout from "~/components/layout/DashboardLayout";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useDisclosure from "~/utils/hooks/useDisclosure";
import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";

import { Button, Flex, Plus } from "@biolnk/ui";
import DraggableList from "~/components/dashboard/DraggableList";

function OverviewPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <DashboardLayout>
      <Flex justify="end" className="flex-col-reverse xs:flex-row">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onOpen}
          uppercase
        >
          Add link
        </Button>
        <NewLinkDialog open={isOpen} onClose={onClose} />
      </Flex>

      <DraggableList />
    </DashboardLayout>
  );
}

export default withAuthCheck(OverviewPage);
