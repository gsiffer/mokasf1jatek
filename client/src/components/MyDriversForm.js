import Wrapper from "../assets/wrappers/Form";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useAppContext } from "../context/appContext";
import Select from "react-select";
import ErrorMessage from "./ErrorMessage";
import Alert from "./Alert";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";

// const CET_TIME_ZONE = "Europe/Paris";

const MyDriversForm = () => {
  const {
    allDrivers,
    slidingPanel,
    slidePanel,
    location,
    createMyDrivers,
    showAlert,
    isDisplayErrorOnForm,
    myDrivers,
    editMyDrivers,
    getAllDrivers,
    getConstructors,
    constructors,
  } = useAppContext();

  // const firstNameInputRef = useRef(null);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const INITIAL_OPTIONS = {
    driver1: null,
    driver2: null,
    driver3: null,
    driver4: null,
    driver5: null,
    team: null,
  };

  const [selectedOptions, setSelectedOptions] = useState(INITIAL_OPTIONS);

  const INITIAL_DATA = {
    locationName: location._id,
    driver1: "",
    driver2: "",
    driver3: "",
    driver4: "",
    driver5: "",
    teamName: "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  const optionsDrivers = allDrivers.map((driver) => ({
    value: driver._id,
    label: capitalizeFirstLetters(
      `${driver.firstName} ${driver.lastName} / ${
        driver.teamName ? driver.teamName.constructorName : "N/A"
      }`
    ),
  }));

  useEffect(() => {
    getAllDrivers();
    getConstructors();
    //   firstNameInputRef.current.focus();

    if (slidingPanel.editID !== 0) {
      console.log(myDrivers);

      // const editedDrivers = myDrivers.findById(slidingPanel.editID);
      //   (driver) => driver._id === slidingPanel.editID
      // );

      if (myDrivers._id === slidingPanel.editID) {
        setFormData({
          ...formData,
          driver1: myDrivers.driver1,
          driver2: myDrivers.driver2,
          driver3: myDrivers.driver3,
          driver4: myDrivers.driver4,
          driver5: myDrivers.driver5,
          teamName: myDrivers.teamName,
        });

        setSelectedOptions({
          ...selectedOptions,
          driver1: {
            value: 1,
            label: capitalizeFirstLetters(myDrivers.driver1),
          },
          driver2: {
            value: 2,
            label: capitalizeFirstLetters(myDrivers.driver2),
          },
          driver3: {
            value: 3,
            label: capitalizeFirstLetters(myDrivers.driver3),
          },
          driver4: {
            value: 4,
            label: capitalizeFirstLetters(myDrivers.driver4),
          },
          driver5: {
            value: 5,
            label: capitalizeFirstLetters(myDrivers.driver5),
          },
          team: {
            value: 6,
            label: capitalizeFirstLetters(myDrivers.teamName),
          },
        });
      }
    }
  }, []);

  const optionsTeam = constructors.map((constructor) => ({
    value: constructor._id,
    label: capitalizeFirstLetters(constructor.constructorName),
  }));

  const handleClickSave = (e) => {
    e.preventDefault();
    setIsSaveClicked(true);

    if (formValidation()) {
      if (slidingPanel.isNew) {
        createMyDrivers(formData);
        // handleClickClose();
        setFormData(INITIAL_DATA);
        setSelectedOptions(INITIAL_OPTIONS);
        setIsSaveClicked(false);
      } else {
        editMyDrivers(formData);
      }
    }
  };

  const handleClickClose = (e) => {
    slidePanel();
    setFormData(INITIAL_DATA);
  };

  const formValidation = () => {
    if (
      formData.driver1.trim().length === 0 ||
      formData.driver2.trim().length === 0 ||
      formData.driver3.trim().length === 0 ||
      formData.driver4.trim().length === 0 ||
      formData.driver5.trim().length === 0 ||
      formData.teamName.trim().length === 0
    ) {
      return false;
    }
    return true;
  };

  // const handleInputChange = (e) => {
  //   console.log(e.target.name);
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setIsSaveClicked(false);
  // };

  const handleOptionChange = (selectedOption, selectedId) => {
    console.log(
      `${JSON.stringify(selectedOption)} and ${selectedId} and ${
        selectedOption.label
      }`
    );

    // Handle the change based on the selectId
    if (selectedId === "driver1") {
      setSelectedOptions({ ...selectedOptions, driver1: selectedOption });
      // customStyles(isSaveClicked, formData, "driver1");
      setFormData({
        ...formData,
        driver1: selectedOption.label,
      });
    } else if (selectedId === "driver2") {
      setSelectedOptions({ ...selectedOptions, driver2: selectedOption });
      // setSelectedDriverOption(selectedOption);
      // customStyles(isSaveClicked, formData, "driver2");
      setFormData({
        ...formData,
        driver2: selectedOption.label,
      });
    } else if (selectedId === "driver3") {
      setSelectedOptions({ ...selectedOptions, driver3: selectedOption });
      // setSelectedDriverOption(selectedOption);
      setFormData({
        ...formData,
        driver3: selectedOption.label,
      });
    } else if (selectedId === "driver4") {
      setSelectedOptions({ ...selectedOptions, driver4: selectedOption });
      // setSelectedDriverOption(selectedOption);
      setFormData({
        ...formData,
        driver4: selectedOption.label,
      });
    } else if (selectedId === "driver5") {
      setSelectedOptions({ ...selectedOptions, driver5: selectedOption });
      // setSelectedDriverOption(selectedOption);
      setFormData({
        ...formData,
        driver5: selectedOption.label,
      });
    } else if (selectedId === "team") {
      setSelectedOptions({ ...selectedOptions, team: selectedOption });
      // setSelectedDriverOption(selectedOption);
      setFormData({
        ...formData,
        teamName: selectedOption.label,
      });
    }
  };

  // Select component style
  const customStyles = (isSaveClicked, formData, comboBoxName) => ({
    control: (provided) => ({
      ...provided,
      borderColor:
        isSaveClicked && formData[comboBoxName].trim().length === 0
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
  });

  return (
    <Wrapper>
      <div className="form-header">
        <h5>{slidingPanel.isNew ? "New Bet" : "Edit Bet"}</h5>
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
            <label>Driver 1</label>
            <span>*</span>
            {isSaveClicked && formData.driver1.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            // className={`${
            //   isSaveClicked &&
            //   formData.driver1.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "driver1")}
            options={optionsDrivers}
            value={selectedOptions.driver1}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "driver1")
            }
          />
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Driver 2</label>
            <span>*</span>
            {isSaveClicked && formData.driver2.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            // className={`${
            //   isSaveClicked &&
            //   formData.teamName.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "driver2")}
            options={optionsDrivers}
            value={selectedOptions.driver2}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "driver2")
            }
          />
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Driver 3</label>
            <span>*</span>
            {isSaveClicked && formData.driver3.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            // className={`${
            //   isSaveClicked &&
            //   formData.teamName.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "driver3")}
            options={optionsDrivers}
            value={selectedOptions.driver3}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "driver3")
            }
          />
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Driver 4</label>
            <span>*</span>
            {isSaveClicked && formData.driver4.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            // className={`${
            //   isSaveClicked &&
            //   formData.teamName.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "driver4")}
            options={optionsDrivers}
            value={selectedOptions.driver4}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "driver4")
            }
          />
        </div>

        <div className="form-field">
          <div className="error-message">
            <label>Driver 5</label>
            <span>*</span>
            {isSaveClicked && formData.driver5.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <Select
            // className={`${
            //   isSaveClicked &&
            //   formData.teamName.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "driver5")}
            options={optionsDrivers}
            value={selectedOptions.driver5}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "driver5")
            }
          />
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
            // className={`${
            //   isSaveClicked &&
            //   formData.teamName.trim().length === 0 &&
            //   "input-error"
            // }`}
            styles={customStyles(isSaveClicked, formData, "teamName")}
            options={optionsTeam}
            value={selectedOptions.team}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption, "team")
            }
          />
        </div>

        {/* <div>${JSON.stringify(formData)}</div> */}
        {/* <div>{formData.driver1}</div> */}

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

export default MyDriversForm;
