import Image from "next/image";
import Link from "../Link";
import NewLinkDialog from "~/components/dashboard/AddLinkDialog";
import { Plus, Dropdown, Feather } from "@biolnk/gamut";
import { useAppContext } from "~/data/context";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums/routes";
import type { FC } from "react";
import type { User } from "@biolnk/core";

export interface MenuProps {
  user: User | undefined;
  pageLink: string;
}

const Menu: FC<MenuProps> = ({ user, pageLink }) => {
  const { signOut } = useSupabase();
  const { addLinkDialog } = useAppContext();

  const avatarAlt = `${user?.username} profile`;

  return (
    <>
      <NewLinkDialog
        open={addLinkDialog.isOpen}
        onClose={addLinkDialog.onClose}
      />

      <Dropdown
        trigger={
          <button type="button" className="rounded-full flex">
            <Image
              src={user?.avatar_url}
              alt={avatarAlt}
              width={36}
              height={36}
            />
          </button>
        }
      >
        <Dropdown.Group>
          {/* @ts-ignore */}
          <Dropdown.ListItem as={Link} url={Routes.DASHBOARD}>
            Dashboard
          </Dropdown.ListItem>
          {/* @ts-ignore */}
          <Dropdown.ListItem as={Link} url={Routes.ACCOUNT}>
            Settings
          </Dropdown.ListItem>
        </Dropdown.Group>

        <Dropdown.Group>
          {/* @ts-ignore */}
          <Dropdown.ListItem as={Link} url={pageLink} external noIcon>
            My Page
          </Dropdown.ListItem>
          <Dropdown.ListItem
            as="button"
            onClick={addLinkDialog.onOpen}
            rightIcon={Plus}
          >
            Add Link
          </Dropdown.ListItem>

          <Dropdown.ListItem
            as={Link}
            // @ts-ignore
            url="https://github.com/Kerosz/biolnk/issues/new?assignees=&labels=bug&template=bug-report-template.md&title="
            rightIcon={Feather}
            external
            noIcon
          >
            Submit an Issue
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
