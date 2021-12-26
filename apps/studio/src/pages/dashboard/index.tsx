import DashboardLayout from "~/components/layout/DashboardLayout";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useDisclosure from "~/utils/hooks/useDisclosure";
import useUser from "~/utils/hooks/queries/useUser";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import useLinks from "~/utils/hooks/queries/useLinks";
import { Button, Flex, Heading, Plus } from "@biolnk/ui";
import LinkCard from "~/components/dashboard/LinkCard";

function OverviewPage() {
  const { user } = useUser();
  const { links } = useLinks();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <DashboardLayout>
      <Flex justify="between" className="flex-col-reverse xs:flex-row">
        <Heading as="h1" size="md" className="font-medium mt-10 xs:mt-0">
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

      <ul className="mt-6 xs:mt-8 space-y-4">
        {links && links.map((l) => <LinkCard key={l.id} {...l} />)}
      </ul>
    </DashboardLayout>
  );
}

export default withAuthCheck(OverviewPage);
