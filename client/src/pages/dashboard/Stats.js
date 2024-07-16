// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Stats = () => {
  //   const [items, setItems] = useState([
  //     { id: "1", content: "Item 1" },
  //     { id: "2", content: "Item 2" },
  //     { id: "3", content: "Item 3" },
  //     { id: "4", content: "Item 4" },
  //   ]);
  //   const handleOnDragEnd = (result) => {
  //     if (!result.destination) return;
  //     const reorderedItems = Array.from(items);
  //     const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
  //     reorderedItems.splice(result.destination.index, 0, reorderedItem);
  //     setItems(reorderedItems);
  //   };
  //   return (
  //     <DragDropContext onDragEnd={handleOnDragEnd}>
  //       <Droppable droppableId="menu">
  //         {(provided) => (
  //           <ul {...provided.droppableProps} ref={provided.innerRef}>
  //             {items.map(({ id, content }, index) => (
  //               <Draggable key={id} draggableId={id} index={index}>
  //                 {(provided) => (
  //                   <li
  //                     ref={provided.innerRef}
  //                     {...provided.draggableProps}
  //                     {...provided.dragHandleProps}
  //                   >
  //                     {content}
  //                   </li>
  //                 )}
  //               </Draggable>
  //             ))}
  //             {provided.placeholder}
  //           </ul>
  //         )}
  //       </Droppable>
  //     </DragDropContext>
  //   );
  // return (
  //   <DragDropContext onDragEnd={handleOnDragEnd}>
  //     <Droppable droppableId="menu">
  //       {(provided) => (
  //         <ul {...provided.droppableProps} ref={provided.innerRef}>
  //           {items.map(({ id, content }, index) => (
  //             <Draggable key={id} draggableId={id} index={index}>
  //               {(provided) => (
  //                 <li
  //                   ref={provided.innerRef}
  //                   {...provided.draggableProps}
  //                   {...provided.dragHandleProps}
  //                 >
  //                   {content}
  //                 </li>
  //               )}
  //             </Draggable>
  //           ))}
  //           {provided.placeholder}
  //         </ul>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // );
};

export default Stats;
