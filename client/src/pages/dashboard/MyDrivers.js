import Wrapper from "../../assets/wrappers/MyDrivers";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import moment from "moment";
import "moment-timezone";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import capitalizeFirstLetters from "../../utils/capitalizeFirstLetters";

const CET_TIME_ZONE = "Europe/Paris";

const MyDrivers = () => {
  const HEADER = "My Drivers";
  const COLUMNS = [
    "Driver 1",
    "Driver 2",
    "Driver 3",
    "Driver 4",
    "Driver 5",
    "Team",
  ];

  const {
    locationCloseDate,
    getMyDrivers,
    isLoading,
    showAlert,
    isDisplayErrorOnForm,
    myDrivers,
    location,
    slidingPanel,
    slidePanel,
    getAllDrivers,
    getConstructors,
  } = useAppContext();

  const [remainingTime, setRemainingTime] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  let targetDate = null;
  let timerId = null;

  useEffect(() => {
    getAllDrivers();
    getConstructors();
    getMyDrivers();
    return () => {
      // console.log("LEAVE");
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (locationCloseDate) {
      targetDate = moment.tz(locationCloseDate, CET_TIME_ZONE).format();
      updateRemainingTime();
      timerId = setInterval(updateRemainingTime, 1000);
    }

    return () => {
      // console.log("LEAVE");
      clearInterval(timerId);
    };
  }, [locationCloseDate]);

  const updateRemainingTime = () => {
    console.log("still runing");
    const timeNow = moment.tz(new Date(), CET_TIME_ZONE).format();
    const timeDifference = moment(targetDate).diff(moment(timeNow));

    if (timeDifference < 0) {
      // console.log("LEAVE");
      clearInterval(timerId);
      setRemainingTime({
        ...remainingTime,
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
      });
      return;
    }
    setRemainingTime({
      ...remainingTime,
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    });
  };

  // clearTimeout(timerId);

  // setTimeout(() => {
  //   console.log("start");
  //   setTimeNow(moment.tz(new Date(), CET_TIME_ZONE).format());
  //   setTimeDifference(moment(targetDate).diff(moment(timeNow)));

  //   setRemainingTime({
  //     ...remainingTime,
  //     days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
  //     hours: Math.floor(
  //       (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     ),
  //     minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
  //     seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  //   });
  // }, 1000);

  if (isLoading) {
    return <Loading center />;
  }

  // if (remainingTime.days != null && !isNaN(remainingTime.days)) {
  //   return (
  //     <div>
  //       <h2>{`Remaining Time: ${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}</h2>
  //     </div>
  //   );
  // } else {
  //   return <h2>No More Bet</h2>;
  // }

  return (
    <Wrapper>
      <div className="table-container">
        <h2 className="table-heading">{HEADER}</h2>

        {showAlert && !isDisplayErrorOnForm && <Alert />}

        {remainingTime.days != null && !isNaN(remainingTime.days) ? (
          <div className="remaining-time">
            <h2>Remaining Time:&nbsp;</h2>
            <h2>{`${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}</h2>
          </div>
        ) : (
          <h2>No More Bet</h2>
        )}

        <h4>{location ? location.locationName : "No Race"}</h4>

        <div className="table-menu">
          {/* <div className="page-count-header">
            <h5>
              {totalDrivers} driver{drivers.length > 1 && "s"} found
            </h5>

            <h5 className="page-count">
              page {pageDriver} of {numOfDriversPages}
            </h5>
          </div> */}

          {/* {remainingTime.days != null && ( */}
          <button
            type="button"
            disabled={new Date(locationCloseDate) < new Date() ? true : false}
            className="btn btn-height"
            onClick={() =>
              myDrivers
                ? slidePanel(
                    !slidingPanel.isPanelSlide,
                    "my_drivers",
                    false,
                    myDrivers._id
                  )
                : slidePanel(!slidingPanel.isPanelSlide, "my_drivers", true)
            }
          >
            {myDrivers ? "Edit Bet" : "New Bet"}
          </button>
          {/* )} */}
        </div>

        <table className="vertical-table">
          <thead>
            <tr className="vertical-columns">
              {COLUMNS.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="vertical-columns">
              <td className="line" data-heading={COLUMNS[0]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.driver1) : "N/A"}
              </td>
              <td className="line" data-heading={COLUMNS[1]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.driver2) : "N/A"}
              </td>
              <td className="line" data-heading={COLUMNS[2]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.driver3) : "N/A"}
              </td>
              <td className="line" data-heading={COLUMNS[3]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.driver4) : "N/A"}
              </td>
              <td className="line" data-heading={COLUMNS[4]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.driver5) : "N/A"}
              </td>
              <td className="line" data-heading={COLUMNS[5]}>
                {myDrivers ? capitalizeFirstLetters(myDrivers.teamName) : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* {numOfDriversPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfDriversPages}
          page={pageDriver}
          type="drivers"
        />
      )} */}
    </Wrapper>
  );
};

export default MyDrivers;

//  const now = moment.tz(new Date(), CET_TIME_ZONE);

//   // const now = new Date(formatDateTimeToCET(new Date()));
//   console.log(now);

//   const targetDate = moment.tz(location.locationCloseDate, CET_TIME_ZONE);

//   console.log(targetDate);

//   // Calculate the time difference in milliseconds
//   const timeDifference = targetDate - now;

//   if (timeDifference <= 0) {
//     return;
//   }

//   console.log(timeDifference);

//   // Calculate days, hours, minutes, and seconds from milliseconds
//   let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   let hours = Math.floor(
//     (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//   let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//   console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);

//   // // Update the counter element
//   // document.getElementById(
//   //   "counter"
//   // ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//   // // Call the updateCounter function every second
//   // setTimeout(() => {
//   //   updateCounter(targetDatetime);
//   // }, 1000);
