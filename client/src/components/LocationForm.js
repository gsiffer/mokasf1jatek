import Wrapper from "../assets/wrappers/LocationForm";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useAppContext } from "../context/appContext";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Select from "react-select";
import ErrorMessage from "./ErrorMessage";
import moment from "moment";
import "moment-timezone";
import Alert from "./Alert";

const CET_TIME_ZONE = "Europe/Paris";

const LocationForm = () => {
  const {
    locations,
    slidingPanel,
    slidePanel,
    createLocation,
    showAlert,
    isDisplayErrorOnForm,
    editLocation,
  } = useAppContext();

  const nameInputRef = useRef(null);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const ACTIVE_DATA = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const [selectedOption, setSelectedOption] = useState(ACTIVE_DATA[1]);

  const INITIAL_DATA = {
    locationName: "",
    locationCloseDate: moment.tz(new Date(), CET_TIME_ZONE),
    isLocationActive: false,
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  useEffect(() => {
    nameInputRef.current.focus();

    if (slidingPanel.editID !== 0) {
      const editedLocation = locations.find(
        (location) => location._id === slidingPanel.editID
      );

      if (editedLocation) {
        setFormData({
          ...formData,
          locationName: editedLocation.locationName,
          locationCloseDate: moment.tz(
            editedLocation.locationCloseDate,
            CET_TIME_ZONE
          ),
          isLocationActive: editedLocation.isLocationActive,
        });
        setSelectedOption(
          ACTIVE_DATA.find(
            (item) => item.value === editedLocation.isLocationActive
          )
        );
      }
    }
  }, []);

  const handleClickSave = (e) => {
    e.preventDefault();
    setIsSaveClicked(true);

    if (formValidation()) {
      if (slidingPanel.isNew) {
        createLocation(formData);
        setFormData(INITIAL_DATA);
        setIsSaveClicked(false);
        setSelectedOption(ACTIVE_DATA[1]);
      } else {
        editLocation(formData);
      }
    }
  };

  const handleClickClose = (e) => {
    slidePanel();
    setFormData(INITIAL_DATA);
  };

  const handleDateChange = (obj) => {
    try {
      setFormData({
        ...formData,
        locationCloseDate: moment.tz(obj, CET_TIME_ZONE),
      });
    } catch (error) {
      alert("Invalid Date");
      setFormData({ ...formData, locationCloseDate: new Date() });
    }
  };

  const formValidation = () => {
    if (formData.locationName.trim().length === 0) {
      return false;
    }
    return true;
  };

  const handleLocationNameChange = (e) => {
    setFormData({ ...formData, locationName: e.target.value });
    setIsSaveClicked(false);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      isLocationActive: selectedOption.value,
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
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
        <h5>{slidingPanel.isNew ? "Add New Location" : "Edit Location"}</h5>
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
            <label>Location Name</label>
            <span>*</span>
            {isSaveClicked && formData.locationName.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <input
            ref={nameInputRef}
            className={`${
              isSaveClicked &&
              formData.locationName.trim().length === 0 &&
              "input-error"
            }`}
            type="text"
            maxLength="30"
            value={formData.locationName}
            onChange={handleLocationNameChange}
          ></input>
        </div>

        <div className="form-field">
          <label>Close Date (CET)</label>

          <div style={{ flex: 1 }}>
            <Datetime
              inputProps={{
                style: { width: "100%" },
              }}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm:ss"
              timeZone={CET_TIME_ZONE}
              value={formData.locationCloseDate}
              onChange={handleDateChange}
              shouldCloseOnSelect={false}
              readOnly
            />
          </div>
        </div>

        <div className="form-field">
          <label>Active</label>
          <Select
            styles={customStyles}
            options={ACTIVE_DATA}
            value={selectedOption}
            onChange={handleOptionChange}
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

export default LocationForm;
