import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DragDropContainer,
  TeamContainer,
  TeamItem,
  Wrapper,
} from "../../assets/wrappers/DriversResult";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";
import capitalizeFirstLetters from "../../utils/capitalizeFirstLetters";
import Alert from "../../components/Alert";

const Results = () => {
  const HEADER = "Results";

  const [startingGrid, setStartingGrid] = useState([]);
  const [finishedGrid, setFinishedGrid] = useState([]);

  useEffect(() => {
    setStartingGrid([
      { driverId: "1", driverName: "elso" },
      { driverId: "2", driverName: "masodik" },
      { driverId: "3", driverName: "harmadik" },
    ]);
    setFinishedGrid([
      { driverId: "1", driverName: "result1" },
      { driverId: "2", driverName: "result2" },
      { driverId: "3", driverName: "result3" },
    ]);
  }, []);

  // const POINTS = [1, 2, 4, 6, 8, 10, 12, 15, 18, 25];

  // const [items, setItems] = useState([]);
  // const [data, setData] = useState({
  //   id: "",
  //   activeLocationName: "",
  //   activeLocationId: "",
  //   items: [],
  // });
  const [isSaved, setIsSaved] = useState(false);

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
    // getMyDrivers();
    // getTeamStandings();
  }, []);

  useEffect(() => {
    // if (teamStandings && teamStandings.items) {
    //   setItems(teamStandings.items);
    // }
    // if (location) {
    //   setData((prevData) => ({
    //     ...prevData,
    //     activeLocationName: location.locationName,
    //     activeLocationId: location._id,
    //   }));
    // }
  }, [teamStandings, location]);

  const handleClickSave = (e) => {
    // e.preventDefault();
    // // Create a new array with updated point values
    // // Update the point or leave it unchanged if no corresponding value in POINT
    // const updatedItems = items.map((item, index) => ({
    //   ...item,
    //   point: POINTS[index] !== undefined ? POINTS[index] : item.point,
    // }));
    // if (!isTeamStandingsSaved) {
    //   const updatedData = {
    //     ...data,
    //     items: updatedItems,
    //   };
    //   setData(updatedData);
    //   createTeamStandings(updatedData);
    //   setIsSaved(true);
    // } else {
    //   const updatedData = {
    //     ...data,
    //     id: teamStandings._id,
    //     items: updatedItems,
    //   };
    //   setData(updatedData);
    //   editTeamStandings(updatedData);
    // }
  };

  // const onDragEnd = (result) => {
  //   if (!result.destination) return; // If dropped outside the list
  //   const { source, destination } = result;
  //   if (source.index === destination.index) return;

  //   const updatedItems = Array.from(startingGrid);
  //   const [movedItem] = updatedItems.splice(source.index, 1);
  //   updatedItems.splice(destination.index, 0, movedItem);
  //   console.log(updatedItems);
  //   setStartingGrid(updatedItems);
  // };

  const onDragEnd = (result, listType) => {
    const { source, destination } = result;

    if (!destination) return; // If dropped outside the list
    if (source.index === destination.index) return; // If dropped in the same spot

    let updatedItems = [];
    let setItems = null;

    if (listType === "startingGrid") {
      updatedItems = Array.from(startingGrid);
      setItems = setStartingGrid;
    } else if (listType === "finishedGrid") {
      updatedItems = Array.from(finishedGrid);
      setItems = setFinishedGrid;
    }

    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    setItems(updatedItems); // Update the corresponding list state
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
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
          {isTeamStandingsSaved ? "Edit" : "Save"}
        </button>
      </div>
      {/* <div>{JSON.stringify(isTeamStandingsSaved)}</div> */}
      {/* <div>{isSaved.toString()}</div> */}
      {/* <div>{JSON.stringify(teamStandings)}</div> */}
      {/* <div>{JSON.stringify(items)}</div> */}
      <DragDropContainer>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, "startingGrid")}
        >
          <Droppable droppableId="startingGrid">
            {(provided) => (
              <TeamContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="team-container"
              >
                {startingGrid.map((item, index) => (
                  <Draggable
                    key={item.driverId}
                    draggableId={item.driverId}
                    index={index}
                  >
                    {(provided) => (
                      <TeamItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {capitalizeFirstLetters(item.driverName)}
                      </TeamItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TeamContainer>
            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, "finishedGrid")}
        >
          <Droppable droppableId="finishedGrid">
            {(provided) => (
              <TeamContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="team-container"
              >
                {finishedGrid.map((item, index) => (
                  <Draggable
                    key={item.driverId}
                    draggableId={item.driverId}
                    index={index}
                  >
                    {(provided) => (
                      <TeamItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {capitalizeFirstLetters(item.driverName)}
                      </TeamItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TeamContainer>
            )}
          </Droppable>
        </DragDropContext>
      </DragDropContainer>
    </Wrapper>
  );
};

export default Results;
