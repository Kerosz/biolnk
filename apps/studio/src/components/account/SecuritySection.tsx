import ConfirmDialog from "~components/ConfirmDialog";
import useDeleteUser from "~/utils/hooks/mutations/useDeleteUser";
import { useRouter } from "next/router";
import { Button, Heading, makeToast, Text } from "@biolnk/gamut";
import { PageWithMetadata, storage, useDisclosure } from "@biolnk/core";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums";
import type { FC } from "react";

export interface SecuritySectionProps {
  user: PageWithMetadata["user"] | null;
}

const SecuritySection: FC<SecuritySectionProps> = ({ user }) => {
  const { mutateAsync, isLoading } = useDeleteUser();
  const { session } = useSupabase();
  const { replace } = useRouter();

  const deleteDialog = useDisclosure();

  const handleDeleteAccount = async () => {
    try {
      if (session?.access_token) {
        await mutateAsync(session?.access_token);

        storage.remove("supabase.auth.token");

        replace(Routes.SIGNIN);
      }
    } catch (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        onConfirm={handleDeleteAccount}
        loading={isLoading}
        message={
          <p>
            Are you sure you want to delete the account, including all the data
            for <span className="font-medium">{user?.username}</span> ? This
            action cannot be undone!
          </p>
        }
      />

      <section
        id="security"
        className="bg-mauve-50 rounded pt-4 pb-5 px-4 sm:px-6 shadow-sm mt-12"
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
