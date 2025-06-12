import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  TeamContainer,
  TeamItem,
  Wrapper,
} from "../../assets/wrappers/TeamOrders";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";
import capitalizeFirstLetters from "../../utils/capitalizeFirstLetters";
import Alert from "../../components/Alert";

// const initialItems = [
//   { id: "1", content: "Item 1" },
//   { id: "2", content: "Item 2" },
//   { id: "3", content: "Item 3" },
//   { id: "4", content: "Item 4" },
//   { id: "5", content: "Item 5" },
//   { id: "6", content: "Item 6" },
//   { id: "7", content: "Item 7" },
//   { id: "8", content: "Item 8" },
//   { id: "9", content: "Item 9" },
//   { id: "10", content: "Item 10" },
// ];

const TeamStandings = () => {
  const HEADER = "Team Standings";
  const POINTS = [1, 2, 4, 6, 8, 10, 12, 15, 18, 25];

  const [items, setItems] = useState([]);
  const [data, setData] = useState({
    id: "",
    activeLocationName: "",
    activeLocationId: "",
    items: [],
  });

  const [isSaved, setIsSaved] = useState(true);

  const {
    getTeamStandings,
    teamStandings,
    isTeamStandingsSaved,
    createTeamStandings,
    editTeamStandings,
    getMyDrivers,
    location,
    isLoading,
    showAlert,
    isDisplayErrorOnForm,
  } = useAppContext();

  useEffect(() => {
    getMyDrivers();
    getTeamStandings();
  }, []);

  useEffect(() => {
    if (teamStandings && teamStandings.items) {
      setItems(teamStandings.items);
    }
    if (location) {
      setData((prevData) => ({
        ...prevData,
        activeLocationName: location.locationName,
        activeLocationId: location._id,
      }));
    }
  }, [teamStandings, location]);

  const handleClickSave = (e) => {
    e.preventDefault();

    // Create a new array with updated point values
    // Update the point or leave it unchanged if no corresponding value in POINT
    const updatedItems = items.map((item, index) => ({
      ...item,
      point: POINTS[index] !== undefined ? POINTS[index] : item.point,
    }));

    if (!isTeamStandingsSaved) {
      const updatedData = {
        ...data,
        items: updatedItems,
      };

      setData(updatedData);
      createTeamStandings(updatedData);
      setIsSaved(true);
    } else {
      const updatedData = {
        ...data,
        id: teamStandings._id,
        items: updatedItems,
      };

      setData(updatedData);
      editTeamStandings(updatedData);
      setIsSaved(true);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    setItems(updatedItems);
    setIsSaved(false);
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {showAlert && isDisplayErrorOnForm && (
          <div className="alert">
            <Alert />
          </div>
        )}

        <h2 className="table-heading">{HEADER}</h2>
        <div className="table-menu">
          <h4>{location ? location.locationName : "No Active Location"}</h4>
          <button
            type="button"
            // disabled={new Date(locationCloseDate) < new Date() ? true : false}
            className="btn btn-height"
            onClick={handleClickSave}
            disabled={isSaved && isTeamStandingsSaved}
          >
            Save
          </button>
        </div>
        {/* <div>{JSON.stringify(isTeamStandingsSaved)}</div> */}
        {/* <div>{isSaved.toString()}</div> */}
        {/* <div>{JSON.stringify(teamStandings)}</div> */}
        {/* <div>{JSON.stringify(items)}</div> */}
      </Wrapper>
      <Droppable droppableId="items">
        {(provided) => (
          <TeamContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="team-container"
          >
            {items.map((item, index) => (
              <Draggable
                key={item.teamId}
                draggableId={item.teamId}
                index={index}
              >
                {(provided) => (
                  <TeamItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {capitalizeFirstLetters(item.teamName)}
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
