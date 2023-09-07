import Location from "../models/Location.js";
import formatDateTimeToCET from "../utils/formatDateTimeToCET.js";
import moment from "moment";
import "moment-timezone";

const CET_TIME_ZONE = "Europe/Paris";

const createJob = async (req, res) => {
  res.send("create job");
};

const getAllJob = async (req, res) => {
  const location = await Location.findOne({ isLocationActive: true });

  const now = moment.tz(new Date(), CET_TIME_ZONE);

  // const now = new Date(formatDateTimeToCET(new Date()));
  console.log(now);

  const targetDate = moment.tz(location.locationCloseDate, CET_TIME_ZONE);

  console.log(targetDate);

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    return;
  }

  console.log(timeDifference);

  // Calculate days, hours, minutes, and seconds from milliseconds
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);

  // // Update the counter element
  // document.getElementById(
  //   "counter"
  // ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // // Call the updateCounter function every second
  // setTimeout(() => {
  //   updateCounter(targetDatetime);
  // }, 1000);

  res.send("get all job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

const showStats = async (req, res) => {
  res.send("show stats job");
};

export { createJob, getAllJob, updateJob, deleteJob, showStats };
