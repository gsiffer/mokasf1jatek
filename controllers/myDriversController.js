import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Location from "../models/Location.js";
import MyDrivers from "../models/MyDrivers.js";
import formatDateTimeToCET from "../utils/formatDateTimeToCET.js";
import User from "../models/User.js";
import xlsx from "xlsx";
import path from "path";
import os from "os";

const getMyDrivers = async (req, res) => {
  const location = await Location.findOne({ isLocationActive: true });

  let locationCloseDate = null;
  let myDrivers = null;

  if (location) {
    myDrivers = await MyDrivers.findOne({
      locationName: location._id,
      createdBy: req.user.userId,
    }).populate({
      path: "locationName",
      model: "Location",
      select: "locationName",
    });

    locationCloseDate = location.locationCloseDate;
  }

  res.status(StatusCodes.OK).json({ locationCloseDate, myDrivers, location });
};

const createMyDrivers = async (req, res) => {
  const {
    locationName,
    driver1,
    driver2,
    driver3,
    driver4,
    driver5,
    teamName,
  } = req.body;

  if (
    !locationName ||
    !driver1 ||
    !driver2 ||
    !driver3 ||
    !driver4 ||
    !driver5 ||
    !teamName
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const location = await Location.findOne({
    isLocationActive: true,
    _id: locationName,
  });

  if (!location) {
    throw new BadRequestError("No active location");
  } else if (new Date(location.locationCloseDate) < new Date()) {
    throw new BadRequestError("The time has expired");
  }

  const count = await MyDrivers.countDocuments({
    locationName: location._id,
    createdBy: req.user.userId,
  });

  if (count > 0) {
    throw new BadRequestError("There is already a saved item in the database");
  }

  req.body.createdBy = req.user.userId;
  const myDrivers = await MyDrivers.create(req.body);

  res.status(StatusCodes.OK).json({ myDrivers });
};

const updateMyDrivers = async (req, res) => {
  const { id: myDriverId } = req.params;
  const {
    locationName,
    driver1,
    driver2,
    driver3,
    driver4,
    driver5,
    teamName,
  } = req.body;

  if (
    !locationName ||
    !driver1 ||
    !driver2 ||
    !driver3 ||
    !driver4 ||
    !driver5 ||
    !teamName
  ) {
    throw new BadRequestError("Please Provide All Values");
  }

  const location = await Location.findOne({
    isLocationActive: true,
    _id: locationName,
  });

  if (!location) {
    throw new BadRequestError("No active location");
  } else if (new Date(location.locationCloseDate) < new Date()) {
    throw new BadRequestError("The time has expired");
  }

  const myDrivers = await MyDrivers.findOne({
    _id: myDriverId,
    createdBy: req.user.userId,
  });
  if (!myDrivers) {
    throw new NotFoundError(`No driver with id ${myDriverId}`);
  }

  const lowercaseBody = {};

  for (let key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      lowercaseBody[key] =
        typeof req.body[key] === "string"
          ? req.body[key].toLowerCase()
          : req.body[key];
    }
  }

  const updatedMyDrivers = await MyDrivers.findOneAndUpdate(
    { _id: myDriverId },
    lowercaseBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedMyDrivers });
};

// Function to find user name by ID
// const findUserNameById = async (id) => {
//   const user = await User.find((user) => user._id === id);
//   return user ? user.name : "Unknown User";
// };

const getMyDriversExcel = async (req, res) => {
  const location = await Location.findOne({ isLocationActive: true });
  const locationId = location ? location._id : null;

  const bets = locationId
    ? await MyDrivers.find({ locationName: locationId })
    : [];

  // Fetch the user information and add it to each bet
  const updatedBets = [];
  for (const bet of bets) {
    const user = await User.findById(bet.createdBy);
    if (user) {
      updatedBets.push({
        ...bet.toObject(), // Convert mongoose document to plain object
        name: user.name.toLowerCase(),
        lastName: user.lastName.toLowerCase(),
        nickname: user.nickname.toLowerCase(),
        location: location.locationName.toLowerCase(),
      });
    } else {
      updatedBets.push({
        ...bet.toObject(),
        name: "unknown first name",
        lastName: "unknown last name",
        nickname: "unknown nickname",
        location: location.locationName.toLowerCase(),
      });
    }
  }

  // Extract relevant fields for Excel
  const dataForExcel = updatedBets.map((bet) => ({
    driver1: bet.driver1,
    driver2: bet.driver2,
    driver3: bet.driver3,
    driver4: bet.driver4,
    driver5: bet.driver5,
  }));

  // Create a new workbook and worksheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
  xlsx.utils.book_append_sheet(workbook, worksheet, "My Drivers");

  // Define the path to save the Excel file to the Desktop
  const desktopDir = path.join(os.homedir(), "Desktop");
  const filePath = path.join(desktopDir, "my_drivers.xlsx");

  // Write the workbook to a file
  xlsx.writeFile(workbook, filePath);

  // Inform the client that the file has been saved
  res.status(StatusCodes.OK).json({ msg: `File saved to ${filePath}` });

  // Send the updated list as a response
  // res.status(StatusCodes.OK).json(updatedBets);
};

export { getMyDrivers, createMyDrivers, updateMyDrivers, getMyDriversExcel };
