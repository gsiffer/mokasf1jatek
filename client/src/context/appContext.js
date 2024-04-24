import { useReducer, createContext, useContext, useEffect } from "react";

import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_LOCATIONS_BEGIN,
  GET_LOCATIONS_SUCCESS,
  CHANGE_PAGE,
  SLIDING_PANEL,
  CREATE_LOCATION_BEGIN,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_ERROR,
  DELETE_LOCATION_BEGIN,
  DELETE_LOCATION_ERROR,
  EDIT_LOCATION_BEGIN,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_ERROR,
  GET_MY_DRIVERS_BEGIN,
  GET_MY_DRIVERS_SUCCESS,
  GET_CONSTRUCTORS_BEGIN,
  GET_CONSTRUCTORS_SUCCESS,
  HANDLE_CHANGE,
  CREATE_CONSTRUCTOR_BEGIN,
  CREATE_CONSTRUCTOR_SUCCESS,
  CREATE_CONSTRUCTOR_ERROR,
  DELETE_CONSTRUCTOR_BEGIN,
  DELETE_CONSTRUCTOR_ERROR,
  EDIT_CONSTRUCTOR_BEGIN,
  EDIT_CONSTRUCTOR_SUCCESS,
  EDIT_CONSTRUCTOR_ERROR,
  GET_DRIVERS_BEGIN,
  GET_DRIVERS_SUCCESS,
  CREATE_DRIVER_BEGIN,
  CREATE_DRIVER_SUCCESS,
  CREATE_DRIVER_ERROR,
  EDIT_DRIVER_BEGIN,
  EDIT_DRIVER_SUCCESS,
  EDIT_DRIVER_ERROR,
  DELETE_DRIVER_BEGIN,
  DELETE_DRIVER_ERROR,
} from "./actions";

// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");
// const userLocation = localStorage.getItem("location");

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  // jobLocation: "",
  showSidebar: false,
  // locationName: "",
  locationCloseDate: null,
  // isLocationActive: [true, false],
  locations: [],
  totalLocations: 0,
  numOfLocationsPages: 1,
  pageLocation: 1,
  slidingPanel: {
    isPanelSlide: false,
    panelName: "",
    isNew: false,
    editID: 0,
  },
  isDisplayErrorOnForm: false,
  // isLocationCalendarOpen: false,
  constructors: [],
  sortConstructors: "a-z",
  // Drivers
  drivers: [],
  totalDrivers: 0,
  numOfDriversPages: 1,
  pageDriver: 1,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // avoid to send our token to other request which is not belong to our app
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });

  // request interceptors
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // response interceptors
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (message) => {
    dispatch({ type: DISPLAY_ALERT, payload: message });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 2000);
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );

      const { user, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const updatePassword = async (updatedPassword) => {
    dispatch({ type: UPDATE_PASSWORD_BEGIN });
    try {
      const { data } = await authFetch.patch(
        "/auth/updatePassword",
        updatedPassword
      );
      const { user, location } = data;
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_PASSWORD_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getLocations = async () => {
    const { pageLocation } = state;
    let url = `/locations?page=${pageLocation}`;

    dispatch({ type: GET_LOCATIONS_BEGIN });
    try {
      const { data } = await authFetch.get(url); // or authFetch(url) -> get is the default;
      const { locations, totalLocations, numOfLocationsPages } = data;

      if (locations.length === 0 && pageLocation > 1) {
        changePage(pageLocation - 1, "locations");
      }

      dispatch({
        type: GET_LOCATIONS_SUCCESS,
        payload: {
          locations,
          totalLocations,
          numOfLocationsPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const changePage = (page, name) => {
    // if (name === "locations") {
    dispatch({ type: CHANGE_PAGE, payload: { page, name } });
    // }
  };

  const slidePanel = (
    isPanelSlide = false,
    panelName = "",
    isNew = false,
    editID = 0
  ) => {
    dispatch({
      type: SLIDING_PANEL,
      payload: { isPanelSlide, panelName, isNew, editID },
    });
  };

  const createLocation = async (data) => {
    dispatch({ type: CREATE_LOCATION_BEGIN });
    try {
      const locationName = data.locationName.trim();
      const { locationCloseDate, isLocationActive } = data;

      await authFetch.post("/locations", {
        locationName,
        locationCloseDate,
        isLocationActive,
      });
      getLocations();
      dispatch({
        type: CREATE_LOCATION_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_LOCATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteLocation = async (locationId) => {
    dispatch({ type: DELETE_LOCATION_BEGIN });
    try {
      await authFetch.delete(`/locations/${locationId}`);
      getLocations();
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_LOCATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editLocation = async (data) => {
    dispatch({ type: EDIT_LOCATION_BEGIN });
    try {
      const locationName = data.locationName.trim();
      const { locationCloseDate, isLocationActive } = data;

      await authFetch.patch(`/locations/${state.slidingPanel.editID}`, {
        locationName,
        locationCloseDate,
        isLocationActive,
      });
      getLocations();
      dispatch({
        type: EDIT_LOCATION_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_LOCATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getMyDrivers = async () => {
    dispatch({ type: GET_MY_DRIVERS_BEGIN });
    try {
      const { data } = await authFetch.get("/mydrivers");
      const { locationCloseDate } = data;

      dispatch({
        type: GET_MY_DRIVERS_SUCCESS,
        payload: {
          locationCloseDate,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getConstructors = async () => {
    const { sortConstructors } = state;
    let url = `/constructors?sort=${sortConstructors}`;

    dispatch({ type: GET_CONSTRUCTORS_BEGIN });
    try {
      const { data } = await authFetch.get(url); // or authFetch(url) -> get is the default;
      const { constructors } = data;

      dispatch({
        type: GET_CONSTRUCTORS_SUCCESS,
        payload: {
          constructors,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const createConstructor = async (data) => {
    dispatch({ type: CREATE_CONSTRUCTOR_BEGIN });
    try {
      const constructorName = data.trim();

      await authFetch.post("/constructors", {
        constructorName,
      });
      getConstructors();
      dispatch({
        type: CREATE_CONSTRUCTOR_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CONSTRUCTOR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteConstructor = async (constructorId) => {
    dispatch({ type: DELETE_CONSTRUCTOR_BEGIN });
    try {
      await authFetch.delete(`/constructors/${constructorId}`);
      getConstructors();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_CONSTRUCTOR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editConstructor = async (constructorName) => {
    dispatch({ type: EDIT_CONSTRUCTOR_BEGIN });
    try {
      await authFetch.patch(`/constructors/${state.slidingPanel.editID}`, {
        constructorName,
      });
      getConstructors();
      dispatch({
        type: EDIT_CONSTRUCTOR_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CONSTRUCTOR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getDrivers = async () => {
    const { pageDriver } = state;
    let url = `/drivers?page=${pageDriver}`;

    dispatch({ type: GET_DRIVERS_BEGIN });
    try {
      const { data } = await authFetch.get(url); // or authFetch(url) -> get is the default;
      const { drivers, totalDrivers, numOfDriversPages } = data;

      if (drivers.length === 0 && pageDriver > 1) {
        changePage(pageDriver - 1, "drivers");
      }

      dispatch({
        type: GET_DRIVERS_SUCCESS,
        payload: {
          drivers,
          totalDrivers,
          numOfDriversPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const createDriver = async (data) => {
    dispatch({ type: CREATE_DRIVER_BEGIN });
    try {
      const firstName = data.firstName.trim();
      const lastName = data.lastName.trim();
      const teamName = data.teamName.trim();

      await authFetch.post("/drivers", {
        firstName,
        lastName,
        teamName,
      });
      getDrivers();
      dispatch({
        type: CREATE_DRIVER_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DRIVER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editDriver = async (data) => {
    dispatch({ type: EDIT_DRIVER_BEGIN });
    try {
      const firstName = data.firstName.trim();
      const lastName = data.lastName.trim();
      const teamName = data.teamName.trim();

      await authFetch.patch(`/drivers/${state.slidingPanel.editID}`, {
        firstName,
        lastName,
        teamName,
      });
      getDrivers();
      dispatch({
        type: EDIT_DRIVER_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_DRIVER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteDriver = async (driverId) => {
    dispatch({ type: DELETE_DRIVER_BEGIN });
    try {
      await authFetch.delete(`/drivers/${driverId}`);
      getDrivers();
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_DRIVER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // const setLocationCalendar = (isLocationCalendarOpen) => {
  //   dispatch({
  //     type: SET_LOCATION_CALENDAR,
  //     payload: { isLocationCalendarOpen },
  //   });
  // };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        updatePassword,
        getLocations,
        changePage,
        slidePanel,
        createLocation,
        deleteLocation,
        editLocation,
        getMyDrivers,
        getConstructors,
        handleChange,
        createConstructor,
        deleteConstructor,
        editConstructor,
        getDrivers,
        createDriver,
        editDriver,
        deleteDriver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
