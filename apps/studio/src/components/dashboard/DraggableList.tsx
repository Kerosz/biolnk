import React, { FC, useEffect, useState, memo } from "react";
import LinkCard from "~/components/dashboard/LinkCard";
import useLinks from "~/utils/hooks/queries/useLinks";
import useReorderLink from "~/utils/hooks/mutations/useReorderLink";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { getLinksWithOrder, reorderList } from "~/utils/misc/orderLinks";

const DraggableList: FC = () => {
  const { links, isLoading, isError } = useLinks();
  const { mutate } = useReorderLink();

  const [linksList, setLinksList] = useState(links);

  const handleDragEnd = ({ source, destination }: DropResult) => {
    // Dragged outside of container -> cancel
    if (!destination) return;
    // Dragged at the same position -> cancel
    if (destination.index === source.index) return;

    const list = reorderList(linksList, source.index, destination.index);

    setLinksList(list);
    mutate(list);
  };

  useEffect(() => {
    if (links && !isLoading && !isError) {
      setLinksList(getLinksWithOrder(links));
    }
  }, [links]);

  if (isLoading || !linksList) {
    return <span>Skeleton loading</span>;
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
