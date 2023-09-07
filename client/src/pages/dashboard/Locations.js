import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import Wrapper from "../../assets/wrappers/Table";
import PageBtnContainer from "../../components/PageBtnContainer";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import formatDateTimeToCET from "../../utils/formatDateTimeToCET";
import Alert from "../../components/Alert";

const Locations = () => {
  const HEADER = "Locations";
  const COLUMNS = ["Name", "Closing Date ( CET )", "Active", "Options"];

  const {
    locations,
    isLoading,
    getLocations,
    totalLocations,
    numOfLocationsPages,
    pageLocation,
    slidingPanel,
    slidePanel,
    deleteLocation,
    showAlert,
    isDisplayErrorOnForm,
  } = useAppContext();

  useEffect(() => {
    getLocations();
  }, [pageLocation]);

  const editLocationClick = (id) => {
    slidePanel(!slidingPanel.isPanelSlide, "location", false, id);
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
              {totalLocations} location{locations.length > 1 && "s"} found
            </h5>

            <h5 className="page-count">
              page {pageLocation} of {numOfLocationsPages}
            </h5>
          </div>

          <button
            type="button"
            className="btn btn-height"
            onClick={() =>
              slidePanel(!slidingPanel.isPanelSlide, "location", true)
            }
          >
            New Location
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
            {locations.map((location) => (
              <tr key={location._id}>
                <td data-heading={COLUMNS[0]}>{location.locationName}</td>
                <td data-heading={COLUMNS[1]}>
                  {formatDateTimeToCET(location.locationCloseDate)}
                </td>
                <td data-heading={COLUMNS[2]}>
                  {location.isLocationActive ? "Yes" : "No"}
                </td>
                <td className="content-none">
                  <div className="options-container">
                    <button
                      type="button"
                      onClick={() => editLocationClick(location._id)}
                    >
                      <EditIcon title="Edit location" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteLocation(location._id)}
                    >
                      <DeleteIcon title="Delete location" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {numOfLocationsPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfLocationsPages}
          page={pageLocation}
          type="locations"
        />
      )}
    </Wrapper>
  );
};
export default Locations;
