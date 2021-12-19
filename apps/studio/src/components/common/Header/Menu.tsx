import Link from "../Link";
import { Plus, Dropdown, Avatar } from "@biolnk/ui";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";

const Menu = () => {
  const { signOut } = useSupabase();

  return (
    <Dropdown
      trigger={
        <button type="button">
          <Avatar alt="chirila" />
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
        <Dropdown.ListItem rightIcon={Plus}>Add Link</Dropdown.ListItem>
        {/* @ts-ignore */}
        <Dropdown.ListItem as={Link} url={Routes.ACCOUNT}>
          Settings
        </Dropdown.ListItem>
      </Dropdown.Group>

      <Dropdown.Group>
        <Dropdown.ListItem onClick={signOut}>Log out</Dropdown.ListItem>
      </Dropdown.Group>
    </Dropdown>
  );
};

export default Menu;
