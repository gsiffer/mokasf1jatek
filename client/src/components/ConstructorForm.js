import Wrapper from "../assets/wrappers/Form";
import CloseIcon from "./icons/CloseIcon";
import { useAppContext } from "../context/appContext";
import { useEffect, useState, useRef } from "react";
import Alert from "./Alert";
import ErrorMessage from "./ErrorMessage";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";

const ConstructorForm = () => {
  const [constructorName, setConstructorName] = useState("");
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const nameInputRef = useRef(null);

  const {
    constructors,
    slidingPanel,
    slidePanel,
    createConstructor,
    showAlert,
    isDisplayErrorOnForm,
    editConstructor,
  } = useAppContext();

  useEffect(() => {
    nameInputRef.current.focus();

    if (slidingPanel.editID !== 0) {
      const editedConstructor = constructors.find(
        (constructor) => constructor._id === slidingPanel.editID
      );

      if (editedConstructor) {
        setConstructorName(editedConstructor.constructorName);
      }
    }
  }, []);

  const handleClickClose = (e) => {
    slidePanel();
    setConstructorName("");
  };

  const handleConstructorNameChange = (e) => {
    setConstructorName(e.target.value);
    setIsSaveClicked(false);
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    setIsSaveClicked(true);

    if (formValidation()) {
      if (slidingPanel.isNew) {
        createConstructor(constructorName);
        setConstructorName("");
        setIsSaveClicked(false);
      } else {
        editConstructor(constructorName);
      }
    }
  };

  const formValidation = () => {
    if (constructorName.trim().length === 0) {
      return false;
    }
    return true;
  };

  return (
    <Wrapper>
      <div className="form-header">
        <h5>
          {slidingPanel.isNew ? "Add New Constructor" : "Edit Constructor"}
        </h5>
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
            <label>Constructor Name</label>
            <span>*</span>
            {isSaveClicked && constructorName.trim().length === 0 && (
              <ErrorMessage />
            )}
          </div>

          <input
            ref={nameInputRef}
            className={`${
              isSaveClicked &&
              constructorName.trim().length === 0 &&
              "input-error"
            }`}
            type="text"
            maxLength="30"
            value={capitalizeFirstLetters(constructorName)}
            onChange={handleConstructorNameChange}
          ></input>
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

export default ConstructorForm;
