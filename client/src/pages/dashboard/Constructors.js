import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Table";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import Select from "react-select";
import Alert from "../../components/Alert";
import capitalizeFirstLetters from "../../utils/capitalizeFirstLetters";

const Constructors = () => {
  const HEADER = "Constructors";
  const COLUMNS = ["Name", "Options"];

  const SORT_DATA = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const {
    user,
    constructors,
    isLoading,
    getConstructors,
    handleChange,
    sortConstructors,
    slidingPanel,
    slidePanel,
    deleteConstructor,
    showAlert,
    isDisplayErrorOnForm,
  } = useAppContext();

  useEffect(() => {
    getConstructors();
  }, [sortConstructors]);

  const [selectedOption, setSelectedOption] = useState(
    SORT_DATA.find((element) => element.value === sortConstructors)
  );

  const editConstructorClick = (id) => {
    slidePanel(!slidingPanel.isPanelSlide, "constructor", false, id);
  };

  const handleOptionChange = (selectedOption, action) => {
    console.log(action, selectedOption);
    setSelectedOption(selectedOption);
    handleChange({ name: action.name, value: selectedOption.value });
  };

  // Select component style
  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "30px",
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

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <div className="table-container">
        <h2 className="table-heading">{HEADER}</h2>

        {showAlert && !isDisplayErrorOnForm && <Alert />}

        <div className="space-between">
          <div>
            <Select
              name="sortConstructors"
              styles={customStyles}
              options={SORT_DATA}
              value={selectedOption}
              onChange={handleOptionChange}
            />
          </div>

          <button
            type="button"
            disabled={user.role === "admin" ? false : true}
            className="btn btn-height"
            onClick={() =>
              slidePanel(!slidingPanel.isPanelSlide, "constructor", true)
            }
          >
            New Constructor
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {COLUMNS.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {constructors.map((constructor) => (
              <tr key={constructor._id}>
                <td data-heading={COLUMNS[0]}>
                  {capitalizeFirstLetters(constructor.constructorName)}
                </td>

                <td className="content-none">
                  <div className="options-container">
                    <button
                      type="button"
                      disabled={user.role === "admin" ? false : true}
                      onClick={() => editConstructorClick(constructor._id)}
                    >
                      <EditIcon title="Edit constructor" />
                    </button>
                    <button
                      type="button"
                      disabled={user.role === "admin" ? false : true}
                      onClick={() => deleteConstructor(constructor._id)}
                    >
                      <DeleteIcon title="Delete constructor" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Constructors;
