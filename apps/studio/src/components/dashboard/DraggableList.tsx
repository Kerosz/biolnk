import React, { FC, useState, memo } from "react";
import LinkCard from "~/components/dashboard/LinkCard";
import EmptyShell from "../EmptyShell";
import useLinks from "~/utils/hooks/queries/useLinks";
import useReorderLink from "~/utils/hooks/mutations/useReorderLink";
import useSafeLayoutEffect from "~/utils/hooks/useSafeLayoutEffect";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { FilePlus } from "@biolnk/ui";
import { useAppContext } from "~/data/context";
import { getLinksWithOrder, reorderList } from "~/utils/misc/orderLinks";

const DraggableList: FC = () => {
  const { links, isLoading, isError } = useLinks();
  const { openAddLinkDialog } = useAppContext();
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

  /** @TODO Implement <Skeleton /> component */
  if (isLoading) {
    return <span>Skeleton loading</span>;
  }

  if (!isLoading && links.length < 1) {
    return (
      <EmptyShell
        text="Begin by adding your first link"
        icon={FilePlus}
        onPress={openAddLinkDialog}
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

export default memo(DraggableList);
