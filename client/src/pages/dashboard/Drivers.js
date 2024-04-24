import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/Table";
import Loading from "../../components/Loading";
import PageBtnContainer from "../../components/PageBtnContainer";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import capitalizeFirstLetters from "../../utils/capitalizeFirstLetters";
import Alert from "../../components/Alert";

const Drivers = () => {
  const HEADER = "Drivers";
  const COLUMNS = ["First Name", "Last Name", "Team Name", "Options"];

  const {
    drivers,
    isLoading,
    getDrivers,
    totalDrivers,
    numOfDriversPages,
    pageDriver,
    slidingPanel,
    slidePanel,
    deleteDriver,
    showAlert,
    isDisplayErrorOnForm,
    getConstructors,
  } = useAppContext();

  useEffect(() => {
    getDrivers();
    getConstructors(); // Get all constructor for the driver form to fill the constructor drop down
  }, [pageDriver]);

  const editDriverClick = (id) => {
    slidePanel(!slidingPanel.isPanelSlide, "driver", false, id);
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <div className="table-container">
        <h2 className="table-heading">{HEADER}</h2>

        {showAlert && !isDisplayErrorOnForm && <Alert />}

        <div className="table-menu">
          <div className="page-count-header">
            <h5>
              {totalDrivers} driver{drivers.length > 1 && "s"} found
            </h5>

            <h5 className="page-count">
              page {pageDriver} of {numOfDriversPages}
            </h5>
          </div>

          <button
            type="button"
            className="btn btn-height"
            onClick={() =>
              slidePanel(!slidingPanel.isPanelSlide, "driver", true)
            }
          >
            New Driver
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
            {drivers.map((driver) => (
              <tr key={driver._id}>
                <td data-heading={COLUMNS[0]}>
                  {capitalizeFirstLetters(driver.firstName)}
                </td>
                <td data-heading={COLUMNS[1]}>
                  {capitalizeFirstLetters(driver.lastName)}
                </td>
                <td data-heading={COLUMNS[2]}>
                  {capitalizeFirstLetters(driver.teamName.constructorName)}
                </td>
                <td className="content-none">
                  <div className="options-container">
                    <button
                      type="button"
                      onClick={() => editDriverClick(driver._id)}
                    >
                      <EditIcon title="Edit driver" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDriver(driver._id)}
                    >
                      <DeleteIcon title="Delete driver" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {numOfDriversPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfDriversPages}
          page={pageDriver}
          type="drivers"
        />
      )}
    </Wrapper>
  );
};

export default Drivers;
