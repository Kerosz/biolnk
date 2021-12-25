import DashboardLayout from "~/components/layout/DashboardLayout";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useDisclosure from "~/utils/hooks/useDisclosure";
import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Button, Flex, Heading, Plus } from "@biolnk/ui";

function OverviewPage() {
  const { user } = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <DashboardLayout>
      <Flex justify="between">
        <Heading as="h1" size="md" className="font-medium mb-8">
          {`@${user?.username}'s links`}
        </Heading>

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
    </DashboardLayout>
  );
}

export default withAuthCheck(OverviewPage);