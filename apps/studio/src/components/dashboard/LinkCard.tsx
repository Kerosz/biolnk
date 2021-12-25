import React, { FC } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import useDeleteLink from "~/utils/hooks/mutations/useDeleteLink";
import useDisclosure from "~/utils/hooks/useDisclosure";
import {
  BaseIcon,
  Button,
  Edit,
  Flex,
  MoreVertical,
  Text,
  Trash2,
} from "@biolnk/ui";
import { Link } from "~/types";

const LinkCard: FC<Link> = ({ title, url, id }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate } = useDeleteLink();

  const handleDeleteLink = () => {
    mutate(id);
    onClose();
  };

  return (
    <>
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteLink}
        message={
          <p>
            Are you sure you want to delete the following link:{" "}
            <span className="font-medium">{url}</span> ?
          </p>
        }
      />
      <Flex
        as="li"
        className="bg-white shadow-sm rounded border border-mauve-200"
      >
        <Flex
          as="button"
          justify="center"
          align="center"
          className="border-r border-mauve-400 p-3 text-mauve-700 cursor-grab hover:bg-mauve-50"
        >
          <BaseIcon icon={MoreVertical} size="xl" />
        </Flex>
        <div className="p-5">
          <Text as="p" className="font-medium mb-1.5">
            {title}
          </Text>
          <Text as="p" variant="light" size="sm">
            {url}
          </Text>

          <Flex className="mt-4 space-x-3">
            <Button aria-label="Edit" icon={Edit} variant="text" noSpace />
            <Button
              aria-label="Delete"
              icon={Trash2}
              variant="text"
              noSpace
              onClick={onOpen}
            />
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default LinkCard;
