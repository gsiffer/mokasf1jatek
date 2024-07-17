import Wrapper from "../assets/wrappers/Form";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useAppContext } from "../context/appContext";
import Select from "react-select";
import ErrorMessage from "./ErrorMessage";
import Alert from "./Alert";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";

// const CET_TIME_ZONE = "Europe/Paris";

const DriverForm = () => {
  const {
    driversPerPage,
    slidingPanel,
    slidePanel,
    createDriver,
    showAlert,
    isDisplayErrorOnForm,
    editDriver,
    constructors,
  } = useAppContext();

  const firstNameInputRef = useRef(null);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const [selectedTeamOption, setSelectedTeamOption] = useState(null);

  // const TEAM_NAME_DATA = getLocations();

  // console.log(TEAM_NAME_DATA);

  // const [selectedOption, setSelectedOption] = useState(ACTIVE_DATA[1]);

  const INITIAL_DATA = {
    firstName: "",
    lastName: "",
    teamName: "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  useEffect(() => {
    firstNameInputRef.current.focus();

    if (slidingPanel.editID !== 0) {
      const editedDriver = driversPerPage.find(
        (driver) => driver._id === slidingPanel.editID
      );

      if (editedDriver) {
        setFormData({
          ...formData,
          firstName: editedDriver.firstName,
          lastName: editedDriver.lastName,
          teamName: editedDriver.teamName ? editedDriver.teamName._id : "",
        });
        setSelectedTeamOption(
          // options.find((item) => item.value === editedDriver.teamName._id)
          options.find((item) => item.value === editedDriver.teamName?._id) || {
            label: "N/A",
            value: "N/A",
          }
        );
      }
    }
  }, []);

  const options = constructors.map((constructor) => ({
    value: constructor._id,
    label: capitalizeFirstLetters(constructor.constructorName),
  }));

  const handleClickSave = (e) => {
    e.preventDefault();
    setIsSaveClicked(true);

    if (formValidation()) {
      if (slidingPanel.isNew) {
        createDriver(formData);
        setFormData(INITIAL_DATA);
        setSelectedTeamOption(null);
        setIsSaveClicked(false);
      } else {
        editDriver(formData);
      }
    }
  };

  const handleClickClose = (e) => {
    slidePanel();
    setFormData(INITIAL_DATA);
  };

  const formValidation = () => {
    if (
      formData.firstName.trim().length === 0 ||
      formData.lastName.trim().length === 0 ||
      formData.teamName.trim().length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaveClicked(false);
  };

  const handleTeamOptionChange = (selectedOption) => {
    // console.log(selectedOption);
    setSelectedTeamOption(selectedOption);
    setFormData({
      ...formData,
      teamName: selectedOption.value,
    });
  };

  // Select component style
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor:
        isSaveClicked && formData.teamName.trim().length === 0
          ? "red"
          : "initial",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "35px",
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    input: (provided) => ({
      ...provided,

      minHeight: "25px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
    }),
    menu: (provided) => ({
      ...provided,
      lineHeight: "1", // Set the desired line height here
    }),
  };

  return (
    <Wrapper>
      <div className="form-header">
        <h5>{slidingPanel.isNew ? "Add New Driver" : "Edit Driver"}</h5>
        <div>
          <button
            type="button"
            className="close-x-btn"
            onClick={handleClickClose}
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {showAlert && isDisplayErrorOnForm && (
        <div className="alert">
          <Alert />
        </div>
      )}

      <form>
        <div className="form-field">
          <div className="error-message">
            <label>First Name</label>
            <span>*</span>
            {isSaveClicked && formData.firstName.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <input
            ref={firstNameInputRef}
            className={`${
              isSaveClicked &&
              formData.firstName.trim().length === 0 &&
              "input-error"
            }`}
            name="firstName"
            type="text"
            maxLength="30"
            value={capitalizeFirstLetters(formData.firstName)}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Last Name</label>
            <span>*</span>
            {isSaveClicked && formData.lastName.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <input
            className={`${
              isSaveClicked &&
              formData.lastName.trim().length === 0 &&
              "input-error"
            }`}
            name="lastName"
            type="text"
            maxLength="30"
            value={capitalizeFirstLetters(formData.lastName)}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Team Name</label>
            <span>*</span>
            {isSaveClicked && formData.teamName.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            className={`${
              isSaveClicked &&
              formData.teamName.trim().length === 0 &&
              "input-error"
            }`}
            styles={customStyles}
            options={options}
            value={selectedTeamOption}
            onChange={handleTeamOptionChange}
          />
        </div>

        <div className="btn-container">
          <button type="submit" className="btn" onClick={handleClickSave}>
            {slidingPanel.isNew ? "Add" : "Edit"}
          </button>
          <button type="button" className="btn" onClick={handleClickClose}>
            Close
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default DriverForm;
