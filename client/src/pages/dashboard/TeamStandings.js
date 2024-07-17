import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TeamContainer, TeamItem } from "../../assets/wrappers/TeamOrders";

const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
];

const TeamStandings = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <TeamContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="team-container"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <TeamItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </TeamItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TeamContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TeamStandings;
