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
  CREATE_MY_DRIVERS_BEGIN,
  CREATE_MY_DRIVERS_SUCCESS,
  CREATE_MY_DRIVERS_ERROR,
  EDIT_MY_DRIVERS_BEGIN,
  EDIT_MY_DRIVERS_SUCCESS,
  EDIT_MY_DRIVERS_ERROR,
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
  GET_DRIVERS_PER_PAGE_BEGIN,
  GET_DRIVERS_PER_PAGE_SUCCESS,
  CREATE_DRIVER_BEGIN,
  CREATE_DRIVER_SUCCESS,
  CREATE_DRIVER_ERROR,
  EDIT_DRIVER_BEGIN,
  EDIT_DRIVER_SUCCESS,
  EDIT_DRIVER_ERROR,
  DELETE_DRIVER_BEGIN,
  DELETE_DRIVER_ERROR,
  GET_TEAM_STANDINGS_BEGIN,
  GET_TEAM_STANDINGS_SUCCESS,
  CREATE_TEAM_STANDINGS_BEGIN,
  CREATE_TEAM_STANDINGS_SUCCESS,
  CREATE_TEAM_STANDINGS_ERROR,
  EDIT_TEAM_STANDINGS_BEGIN,
  EDIT_TEAM_STANDINGS_SUCCESS,
  EDIT_TEAM_STANDINGS_ERROR,
  GET_EXCEL_BEGIN,
  GET_EXCEL_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  // if (action.type === REGISTER_USER_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }
  // if (action.type === REGISTER_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "User Created! Redirecting...",
  //   };
  // }
  // if (action.type === REGISTER_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === LOGIN_USER_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }
  // if (action.type === LOGIN_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Login Successful! Redirecting...",
  //   };
  // }
  // if (action.type === LOGIN_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      // jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
      user: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      // jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Password Updated",
    };
  }
  if (action.type === UPDATE_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      // jobLocation: action.payload.location,
    };
  }

  if (action.type === GET_LOCATIONS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_LOCATIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      locations: action.payload.locations,
      totalLocations: action.payload.totalLocations,
      numOfLocationsPages: action.payload.numOfLocationsPages,
    };
  }

  if (action.type === CHANGE_PAGE) {
    if (action.payload.name === "locations") {
      return { ...state, pageLocation: action.payload.page };
    } else if (action.payload.name === "drivers") {
      return { ...state, pageDriver: action.payload.page };
    }
  }

  if (action.type === SLIDING_PANEL) {
    return {
      ...state,
      slidingPanel: {
        isPanelSlide: action.payload.isPanelSlide,
        panelName: action.payload.panelName,
        isNew: action.payload.isNew,
        editID: action.payload.editID,
      },
    };
  }

  if (action.type === CREATE_LOCATION_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_LOCATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Location Created!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === CREATE_LOCATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === DELETE_LOCATION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_LOCATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: false,
    };
  }

  if (action.type === EDIT_LOCATION_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_LOCATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Location Updated!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === EDIT_LOCATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === GET_MY_DRIVERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MY_DRIVERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      locationCloseDate: action.payload.locationCloseDate,
      myDrivers: action.payload.myDrivers,
      location: action.payload.location,
    };
  }

  if (action.type === CREATE_MY_DRIVERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_MY_DRIVERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New My Drivrers Created!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === CREATE_MY_DRIVERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === EDIT_MY_DRIVERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_MY_DRIVERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "MY Drivers Updated!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === EDIT_MY_DRIVERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === GET_CONSTRUCTORS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_CONSTRUCTORS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      constructors: action.payload.constructors,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      //page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CREATE_CONSTRUCTOR_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_CONSTRUCTOR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Constructor Created!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === CREATE_CONSTRUCTOR_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === DELETE_CONSTRUCTOR_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_CONSTRUCTOR_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: false,
    };
  }

  if (action.type === EDIT_CONSTRUCTOR_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_CONSTRUCTOR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Constructor Updated!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === EDIT_CONSTRUCTOR_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === GET_DRIVERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_DRIVERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allDrivers: action.payload.drivers,
    };
  }

  if (action.type === GET_DRIVERS_PER_PAGE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_DRIVERS_PER_PAGE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      driversPerPage: action.payload.drivers,
      totalDrivers: action.payload.totalDrivers,
      numOfDriversPages: action.payload.numOfDriversPages,
    };
  }

  if (action.type === CREATE_DRIVER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_DRIVER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Drivrer Created!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === CREATE_DRIVER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === EDIT_DRIVER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_DRIVER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Driver Updated!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === EDIT_DRIVER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === DELETE_DRIVER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_DRIVER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: false,
    };
  }

  if (action.type === GET_TEAM_STANDINGS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_TEAM_STANDINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      teamStandings: action.payload.teamStandings,
      isTeamStandingsSaved: action.payload.isSaved,
    };
  }

  if (action.type === CREATE_TEAM_STANDINGS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_TEAM_STANDINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Team Standings Created!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === CREATE_TEAM_STANDINGS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === EDIT_TEAM_STANDINGS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TEAM_STANDINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Team Standings Updated!",
      isDisplayErrorOnForm: true,
    };
  }
  if (action.type === EDIT_TEAM_STANDINGS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isDisplayErrorOnForm: true,
    };
  }

  if (action.type === GET_EXCEL_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_EXCEL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  // if (action.type === SET_LOCATION_CALENDAR) {
  //   return {
  //     ...state,
  //     isLocationCalendarOpen: action.payload.isLocationCalendarOpen,
  //   };
  // }

  throw new Error(`no such action: ${action.type} `);
};

export default reducer;
