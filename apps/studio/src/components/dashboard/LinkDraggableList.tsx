import React, { FC, useState, memo } from "react";
import Skeleton from "react-loading-skeleton";
import EmptyShell from "../EmptyShell";
import useLinks from "~/utils/hooks/queries/useLinks";
import useReorderLink from "~/utils/hooks/mutations/useReorderLink";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSafeLayoutEffect } from "@biolnk/core";
import { FilePlus } from "@biolnk/gamut";
import { LinkCard } from "~/components/dashboard";
import { useAppContext } from "~/data/context";
import { getLinksWithOrder, reorderList } from "~/utils/misc/orderLinks";

const LinkDraggableList: FC = () => {
  const { links, isLoading, isError } = useLinks();
  const { addLinkDialog } = useAppContext();
  const { mutate } = useReorderLink();

  const [linksList, setLinksList] = useState([]);

  const handleDragEnd = ({ source, destination }: DropResult) => {
    // Dragged outside of container -> cancel
    if (!destination) return;
    // Dragged at the same position -> cancel
    if (destination.index === source.index) return;

    const list = reorderList(linksList, source.index, destination.index);

    setLinksList(list);
    mutate(list);
  };

  useSafeLayoutEffect(() => {
    if (links && !isLoading && !isError) {
      setLinksList(getLinksWithOrder(links));
    }
  }, [links]);

  if (isLoading) {
    return (
      <Skeleton
        count={3}
        height={136}
        containerClassName="mt-2 block space-y-4"
      />
    );
  }

  if (!isLoading && links.length < 1) {
    return (
      <EmptyShell
        text="Begin by adding your first link"
        icon={FilePlus}
        onPress={addLinkDialog.onOpen}
      />
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-link__list">
        {({ innerRef, droppableProps, placeholder }) => {
          return (
            <ul
              className="mt-6 xs:mt-8 space-y-4"
              ref={innerRef}
              {...droppableProps}
            >
              {linksList.map((l) => (
                <LinkCard key={l.id} {...l} />
              ))}
              {placeholder}
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(LinkDraggableList);
