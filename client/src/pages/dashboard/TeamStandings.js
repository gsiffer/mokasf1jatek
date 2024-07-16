// import { useState, useEffect } from "react";
// import Wrapper from "../../assets/wrappers/TeamOrders";

// const TeamStandings = () => {
//   const [items, setItems] = useState([
//     { id: "1", content: "Item 1" },
//     { id: "2", content: "Item 2" },
//     { id: "3", content: "Item 3" },
//     { id: "4", content: "Item 4" },
//   ]);

//   const [draggedIndex, setDraggedIndex] = useState(null);

//   const handleDragStart = (e, index) => {
//     setDraggedIndex(index);
//     e.dataTransfer.setData("text/plain", index.toString());
//     e.dataTransfer.effectAllowed = "move";
//   };

//   const handleDragOver = (index) => (e) => {
//     if (e.preventDefault) {
//       e.preventDefault(); // Prevent default behavior for the event
//     }

//     if (draggedIndex !== null && draggedIndex !== index) {
//       const draggedItem = items[draggedIndex];
//       const updatedItems = [...items];
//       updatedItems.splice(draggedIndex, 1);
//       updatedItems.splice(index, 0, draggedItem);
//       setItems(updatedItems);
//       setDraggedIndex(index);
//     }
//   };

//   const handleDrop = () => {
//     setDraggedIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null); // Reset draggedIndex when drag ends
//   };

//   return (
//     <Wrapper dragged={draggedIndex !== null}>
//       <div className="team-container">
//         <ul>
//           {items.map((item, index) => (
//             <li
//               key={item.id}
//               className={draggedIndex === index ? "dragged" : ""}
//               draggable
//               onDragStart={(e) => handleDragStart(e, index)}
//               onDragOver={handleDragOver(index)}
//               onDrop={handleDrop}
//               onDragEnd={handleDragEnd}
//             >
//               {item.content}
//             </li>
//           ))}
//         </ul>
//         <div>{JSON.stringify(items, null, 2)}</div>
//       </div>
//     </Wrapper>
//   );
// };

// export default TeamStandings;

// *********************************************************************************************************

// import { useState } from "react";
// import styled from "styled-components";

// const Wrapper = styled.section`
//   .team-container ul {
//     list-style-type: none;
//     padding: 0;
//   }

//   .team-container ul li {
//     position: relative;
//     padding: 10px;
//     margin: 5px;
//     background-color: #f9f9f9;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     cursor: grab;
//     transition: transform 0.3s ease, background-color 0.3s ease,
//       box-shadow 0.5s ease;
//     z-index: 1;
//     min-width: 200px;

//     &:hover {
//       background-color: ${(props) => (props.dragged ? "#f9f9f9" : "#e9e9e9")};
//     }

//     &.dragged {
//       opacity: 0.5;
//       transform: scale(0.95);
//       z-index: 2;
//     }
//   }
// `;

// const TeamStandings = () => {
//   const [items, setItems] = useState([
//     { id: "1", content: "Item 1" },
//     { id: "2", content: "Item 2" },
//     { id: "3", content: "Item 3" },
//     { id: "4", content: "Item 4" },
//   ]);

//   const [draggedIndex, setDraggedIndex] = useState(null);

//   const handleDragStart = (index) => (e) => {
//     setDraggedIndex(index);

//     // For touch events, set up a custom data attribute instead of using dataTransfer
//     if (e.currentTarget) {
//       e.currentTarget.setAttribute("data-index", index);
//       e.currentTarget.style.cursor = "grabbing";
//     }
//   };

//   const handleDragOver = (index) => (e) => {
//     if (e.preventDefault) {
//       e.preventDefault(); // Prevent default behavior for the event
//     }

//     if (draggedIndex !== null && draggedIndex !== index) {
//       const draggedItem = items[draggedIndex];
//       const updatedItems = [...items];
//       updatedItems.splice(draggedIndex, 1);
//       updatedItems.splice(index, 0, draggedItem);
//       setItems(updatedItems);
//       setDraggedIndex(index);
//     }
//   };

//   const handleDrop = (index) => (e) => {
//     if (e.preventDefault) {
//       e.preventDefault(); // Prevent default behavior for the event
//     }

//     if (draggedIndex !== null) {
//       const draggedItem = items[draggedIndex];
//       const updatedItems = [...items];
//       updatedItems.splice(draggedIndex, 1);
//       updatedItems.splice(index, 0, draggedItem);
//       setItems(updatedItems);
//       setDraggedIndex(null);
//     }
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//   };

//   const onTouchStart = (index) => (e) => {
//     const touch = e.touches[0];
//     if (touch && e.currentTarget) {
//       handleDragStart(index)(touch); // Simulate drag start with touch event
//     }
//   };

//   const onTouchMove = (index) => (e) => {
//     const touch = e.touches[0];
//     if (touch) {
//       e.preventDefault(); // Prevent scrolling
//       handleDragOver(index)(touch); // Simulate drag over with touch event
//     }
//   };

//   const onTouchEnd = (index) => (e) => {
//     const touch = e.changedTouches[0];
//     if (touch) {
//       e.preventDefault(); // Prevent scrolling
//       handleDrop(index)(touch); // Simulate drag end with touch event
//     }
//   };

//   return (
//     <Wrapper dragged={draggedIndex !== null}>
//       <div className="team-container">
//         <ul>
//           {items.map((item, index) => (
//             <li
//               key={item.id}
//               className={draggedIndex === index ? "dragged" : ""}
//               draggable={true}
//               onDragStart={handleDragStart(index)}
//               onDragOver={handleDragOver(index)}
//               onDrop={handleDrop(index)}
//               onDragEnd={handleDragEnd}
//               onTouchStart={onTouchStart(index)}
//               onTouchMove={onTouchMove(index)}
//               onTouchEnd={onTouchEnd(index)}
//             >
//               {item.content}
//             </li>
//           ))}
//         </ul>
//         <div>{JSON.stringify(items, null, 2)}</div>
//       </div>
//     </Wrapper>
//   );
// };

// export default TeamStandings;

// *************************************************************************************************************

// import { useState } from "react";
// import styled from "styled-components";

// const Wrapper = styled.section`
//   .team-container ul {
//     list-style-type: none;
//     padding: 0;
//   }

//   .team-container ul li {
//     position: relative;
//     padding: 10px;
//     margin: 5px;
//     background-color: #f9f9f9;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     cursor: grab;
//     transition: transform 0.3s ease, background-color 0.3s ease,
//       box-shadow 0.5s ease;
//     z-index: 1;
//     min-width: 200px;

//     &:hover {
//       background-color: ${(props) => (props.dragged ? "#f9f9f9" : "#e9e9e9")};
//     }

//     &.dragged {
//       opacity: 0.5;
//       transform: scale(0.95);
//       z-index: 2;
//     }
//   }
// `;

// const TeamStandings = () => {
//   const [items, setItems] = useState([
//     { id: "1", content: "Item 1" },
//     { id: "2", content: "Item 2" },
//     { id: "3", content: "Item 3" },
//     { id: "4", content: "Item 4" },
//   ]);

//   const [draggedIndex, setDraggedIndex] = useState(null);

//   const handleDragStart = (index) => (e) => {
//     setDraggedIndex(index);

//     // For touch events, set up a custom data attribute instead of using dataTransfer
//     if (e.currentTarget) {
//       e.currentTarget.setAttribute("data-index", index);
//       e.currentTarget.style.cursor = "grabbing";
//     }
//   };

//   const handleDragOver = (index) => (e) => {
//     // e.preventDefault(); // Avoid preventing default for touch events

//     if (draggedIndex !== null && draggedIndex !== index) {
//       const draggedItem = items[draggedIndex];
//       const updatedItems = [...items];
//       updatedItems.splice(draggedIndex, 1);
//       updatedItems.splice(index, 0, draggedItem);
//       setItems(updatedItems);
//       setDraggedIndex(index);
//     }
//   };

//   const handleDrop = (index) => (e) => {
//     // e.preventDefault(); // Avoid preventing default for touch events

//     if (draggedIndex !== null) {
//       const draggedItem = items[draggedIndex];
//       const updatedItems = [...items];
//       updatedItems.splice(draggedIndex, 1);
//       updatedItems.splice(index, 0, draggedItem);
//       setItems(updatedItems);
//       setDraggedIndex(null);
//     }
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//   };

//   const onTouchStart = (index) => (e) => {
//     const touch = e.touches[0];
//     if (touch && e.currentTarget) {
//       handleDragStart(index)(touch); // Simulate drag start with touch event
//     }
//   };

//   const onTouchMove = (index) => (e) => {
//     const touch = e.touches[0];
//     if (touch) {
//       // e.preventDefault(); // Preventing default can interfere with touch events
//       handleDragOver(index)(touch); // Simulate drag over with touch event
//     }
//   };

//   const onTouchEnd = (index) => (e) => {
//     const touch = e.changedTouches[0];
//     if (touch) {
//       // e.preventDefault(); // Preventing default can interfere with touch events
//       handleDrop(index)(touch); // Simulate drag end with touch event
//     }
//   };

//   return (
//     <Wrapper dragged={draggedIndex !== null}>
//       <div className="team-container">
//         <ul>
//           {items.map((item, index) => (
//             <li
//               key={item.id}
//               className={draggedIndex === index ? "dragged" : ""}
//               draggable={true}
//               onDragStart={handleDragStart(index)}
//               onDragOver={handleDragOver(index)}
//               onDrop={handleDrop(index)}
//               onDragEnd={handleDragEnd}
//               onTouchStart={onTouchStart(index)}
//               onTouchMove={onTouchMove(index)}
//               onTouchEnd={onTouchEnd(index)}
//               onTouchCancel={handleDragEnd} // Ensure proper cleanup on touch cancel
//             >
//               {item.content}
//             </li>
//           ))}
//         </ul>
//         <div>{JSON.stringify(items, null, 2)}</div>
//       </div>
//     </Wrapper>
//   );
// };

// export default TeamStandings;

//*******************************************************************************************************************

import React, { useState } from "react";
import styled from "styled-components";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import Sortable from "../../components/Sortable";

const Wrapper = styled.section`
  .team-container ul {
    list-style-type: none;
    padding: 0;
  }

  .team-container ul li {
    position: relative;
    padding: 10px;
    margin: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: grab;
    transition: transform 0.3s ease, background-color 0.3s ease,
      box-shadow 0.5s ease;
    z-index: 1;
    min-width: 200px;

    &:hover {
      background-color: #e9e9e9;
    }
  }
`;

// const SortableItem = SortableElement(({ value }) => <li>{value.content}</li>);

// const SortableList = SortableContainer(({ items }) => {
//   return (
//     <ul>
//       {items.map((value, index) => (
//         <SortableItem key={`item-${value.id}`} index={index} value={value} />
//       ))}
//     </ul>
//   );
// });

const TeamStandings = () => {
  const [items, setItems] = useState([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
    { id: "4", content: "Item 4" },
    { id: "5", content: "Item 5" },
    { id: "6", content: "Item 6" },
    { id: "7", content: "Item 7" },
    { id: "8", content: "Item 8" },
    { id: "9", content: "Item 9" },
    { id: "10", content: "Item 10" },
    { id: "11", content: "Item 11" },
    { id: "12", content: "Item 12" },
  ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <Wrapper>
      <div className="team-container">
        <Sortable items={items} onSortEnd={onSortEnd} />
        <div>{JSON.stringify(items, null, 2)}</div>
      </div>
    </Wrapper>
  );
};

export default TeamStandings;
