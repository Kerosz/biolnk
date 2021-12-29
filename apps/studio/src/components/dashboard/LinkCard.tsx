import React, { FC, memo } from "react";
import ConfirmDialog from "../ConfirmDialog";
import UpdateLinkDialog from "./UpdateLinkDialog";
import useDeleteLink from "~/utils/hooks/mutations/useDeleteLink";
import useDisclosure from "~/utils/hooks/useDisclosure";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import {
  BaseIcon,
  Button,
  Edit,
  Eye,
  Flex,
  MoreVertical,
  Text,
  Trash2,
} from "@biolnk/ui";
import { Link } from "~/types";

const LinkCard: FC<Link> = ({
  title,
  url,
  id,
  total_clicks,
  display_order,
}) => {
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const { mutate } = useDeleteLink();

  const handleDeleteLink = () => {
    mutate(id);
    deleteDialog.onClose();
  };

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle
  ) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    userSelect: "none",
    opacity: isDragging ? "25%" : "100%",
  });

  return (
    <>
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        onConfirm={handleDeleteLink}
        message={
          <p>
            Are you sure you want to delete the following link:{" "}
            <span className="font-medium">{url}</span> ?
          </p>
        }
      />
      <UpdateLinkDialog
        open={updateDialog.isOpen}
        onClose={updateDialog.onClose}
        linkId={id}
        currentTitle={title}
        currentUrl={url}
      />

      <Draggable draggableId={id} index={display_order}>
        {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
          <Flex
            as="li"
            className="bg-white shadow-sm rounded border border-mauve-200"
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            style={getItemStyle(snapshot.isDragging, draggableProps.style)}
          >
            {/* Dragging Bar */}
            <Flex
              as="button"
              justify="center"
              align="center"
              className="border-r border-mauve-400 p-1.5 text-mauve-900 cursor-grab bg-mauve-300"
            >
              <BaseIcon icon={MoreVertical} size="2xl" />
            </Flex>

            {/* Card content */}
            <Flex
              justify="between"
              align="center"
              className="px-3.5 sm:px-5 pt-5 pb-4 w-full"
            >
              <div className="w-full">
                <Text as="p" className="font-medium mb-1.5">
                  {title}
                </Text>
                <Text as="p" variant="light" size="sm">
                  {url}
                </Text>

                <Flex className="mt-5" align="center" justify="between">
                  <div className="space-x-3">
                    <Button
                      aria-label="Edit"
                      icon={Edit}
                      variant="text"
                      noSpace
                      onClick={updateDialog.onOpen}
                    />
                    <Button
                      aria-label="Delete"
                      icon={Trash2}
                      variant="text"
                      noSpace
                      onClick={deleteDialog.onOpen}
                    />
                  </div>

                  <Flex
                    className="flex xs:!hidden text-mauve-800 sm:mr-3 md:mr-0 lg:mr-3"
                    align="center"
                  >
                    <BaseIcon icon={Eye} size="lg" />
                    <span className="text-mauve-1000 ml-2.5">
                      {total_clicks}
                    </span>
                  </Flex>
                </Flex>
              </div>

              <Flex
                className="!hidden xs:!flex text-mauve-800 sm:mr-3 md:mr-0 lg:mr-3"
                align="center"
              >
                <BaseIcon icon={Eye} size="lg" />
                <span className="text-mauve-1000 ml-2.5">{total_clicks}</span>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Draggable>
    </>
  );
};

export default memo(LinkCard);
