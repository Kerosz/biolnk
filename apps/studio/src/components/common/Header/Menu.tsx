import Link from "../Link";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useUser from "~/utils/hooks/queries/useUser";
import { Plus, Dropdown, Avatar } from "@biolnk/ui";
import { useAppContext } from "~/data/context";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";

const Menu = () => {
  const { user } = useUser();
  const { signOut } = useSupabase();
  const { isAddLinkDialogOpen, closeAddLinkDialog, openAddLinkDialog } =
    useAppContext();

  return (
    <>
      <NewLinkDialog open={isAddLinkDialogOpen} onClose={closeAddLinkDialog} />

      <Dropdown
        trigger={
          <button type="button">
            <Avatar src={user?.avatar_url} alt={user?.username ?? "Biolnk"} />
          </button>
        }
      >
        <Dropdown.Group>
          {/* @ts-ignore */}
          <Dropdown.ListItem as={Link} url={Routes.DASHBOARD}>
            Dashboard
          </Dropdown.ListItem>
        </Dropdown.Group>

        <Dropdown.Group>
          <Dropdown.ListItem
            as="button"
            onClick={openAddLinkDialog}
            rightIcon={Plus}
          >
            Add Link
          </Dropdown.ListItem>
          {/* @ts-ignore */}
          <Dropdown.ListItem as={Link} url={Routes.ACCOUNT}>
            Settings
          </Dropdown.ListItem>
        </Dropdown.Group>

        <Dropdown.Group>
          <Dropdown.ListItem onClick={signOut}>Log out</Dropdown.ListItem>
        </Dropdown.Group>
      </Dropdown>
    </>
  );
};

export default Menu;
