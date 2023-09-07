import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import moment from "moment";
import "moment-timezone";
import Loading from "../../components/Loading";

const CET_TIME_ZONE = "Europe/Paris";

const MyDrivers = () => {
  const { locationCloseDate, getMyDrivers, isLoading } = useAppContext();

  const [remainingTime, setRemainingTime] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  let targetDate = null;
  let timerId = null;

  useEffect(() => {
    getMyDrivers();

    return () => {
      console.log("LEAVE");
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
      console.log("LEAVE");
      clearInterval(timerId);
    };
  }, [locationCloseDate]);

  const updateRemainingTime = () => {
    console.log("still runing");
    const timeNow = moment.tz(new Date(), CET_TIME_ZONE).format();
    const timeDifference = moment(targetDate).diff(moment(timeNow));

    if (timeDifference < 0) {
      clearInterval(timerId);
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

  if (remainingTime.days != null && !isNaN(remainingTime.days)) {
    return (
      <div>
        <h2>{`Remaining Time: ${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}</h2>
      </div>
    );
  } else {
    return <h2>No More Bet</h2>;
  }
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
