import Link from "../Link";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import useDisclosure from "~/utils/hooks/useDisclosure";
import useUser from "~/utils/hooks/queries/useUser";
import { Plus, Dropdown, Avatar } from "@biolnk/ui";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";

const Menu = () => {
  const { user } = useUser();
  const { signOut } = useSupabase();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
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
          <Dropdown.ListItem as="button" onClick={onOpen} rightIcon={Plus}>
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

      <NewLinkDialog open={isOpen} onClose={onClose} />
    </>
  );
};

export default Menu;
