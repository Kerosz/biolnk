import Link from "../Link";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useUser from "~/utils/hooks/queries/useUser";
import { Plus, Dropdown, Avatar } from "@biolnk/gamut";
import { useAppContext } from "~/data/context";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";

const Menu = () => {
  const { user } = useUser();
  const { signOut } = useSupabase();
  const { addLinkDialog } = useAppContext();

  const avatarAlt = `${user?.username} profile`;
  const avatarFallback = user?.username ?? "Biolnk";

  return (
    <>
      <NewLinkDialog
        open={addLinkDialog.isOpen}
        onClose={addLinkDialog.onClose}
      />

      <Dropdown
        trigger={
          <button type="button">
            <Avatar
              src={user?.avatar_url}
              alt={avatarAlt}
              fallback={avatarFallback}
            />
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
            onClick={addLinkDialog.onOpen}
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
