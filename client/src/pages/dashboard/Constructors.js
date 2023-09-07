import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Table";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import Select from "react-select";
import { CREATE_LOCATION_BEGIN } from "../../context/actions";

const Constructors = () => {
  const HEADER = "Constructors";
  const COLUMNS = ["Name", "Options"];

  const SORT_DATA = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const {
    constructors,
    isLoading,
    getConstructors,
    handleChange,
    sortConstructors,
    totalLocations,
    numOfLocationsPages,
    pageLocation,
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
    setSelectedOption(selectedOption);
    handleChange({ name: action.name, value: selectedOption.value });
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <div className="table-container">
        <h2 className="table-heading">{HEADER}</h2>

        {/* {showAlert && !isDisplayErrorOnForm && <Alert />} */}

        <div className="space-between">
          <div>
            <label>Sort</label>
            <Select
              name="sortConstructors"
              options={SORT_DATA}
              value={selectedOption}
              onChange={handleOptionChange}
            />
          </div>

          <button
            type="button"
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
                <td data-heading={COLUMNS[0]}>{constructor.constructorName}</td>

                <td className="content-none">
                  <div className="options-container">
                    <button
                      type="button"
                      onClick={() => editConstructorClick(constructor._id)}
                    >
                      <EditIcon title="Edit constructor" />
                    </button>
                    <button
                      type="button"
                      // onClick={() => deleteConstructor(constructor._id)}
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
      {/* {numOfLocationsPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfLocationsPages}
          page={pageLocation}
          type="locations"
        />
      )} */}
    </Wrapper>
  );
};

export default Constructors;
