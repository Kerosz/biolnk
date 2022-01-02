import ConfirmDialog from "~components/ConfirmDialog";
import useDisclosure from "~/utils/hooks/useDisclosure";
import { Button, Heading, Text } from "@biolnk/ui";
import { PageWithMetadata } from "~/types";
import { FC } from "react";

const SecuritySection: FC<PageWithMetadata["user"]> = ({ username }) => {
  const deleteDialog = useDisclosure();

  const handleDeleteAccount = () => {
    return null;
  };

  return (
    <>
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        onConfirm={handleDeleteAccount}
        message={
          <p>
            Are you sure you want to delete the account, including all the data
            for <span className="font-medium">{username}</span> ? This action
            cannot be undone!
          </p>
        }
      />

      <section
        id="security"
        className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm mt-12"
      >
        {/* Title */}
        <Heading as="h2" size="sm" className="pb-1 font-medium">
          Security
        </Heading>
        <Text size="sm" variant="light" className="mb-8">
          This action will permanently delete your Biolnk page along with all
          the data stored for your account.
        </Text>

        <Button
          variant="colored"
          size="lg"
          block
          className="!bg-red-800 hover:!bg-red-900 active:!bg-red-800"
          onClick={deleteDialog.onOpen}
        >
          Delete Account
        </Button>
      </section>
    </>
  );
};

export default SecuritySection;
