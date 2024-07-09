import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Location from "../models/Location.js";
import MyDrivers from "../models/MyDrivers.js";
import formatDateTimeToCET from "../utils/formatDateTimeToCET.js";
import User from "../models/User.js";
import xlsx from "xlsx";
import path from "path";
import os from "os";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters.js";
import fs from "fs";

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

const getMyDriversExcel = async (req, res) => {
  try {
    // Fetch active location
    const location = await Location.findOne({ isLocationActive: true });
    const locationId = location ? location._id : null;

    // Fetch bets for the active location
    const bets = locationId
      ? await MyDrivers.find({ locationName: locationId })
      : [];

    // Fetch user information and prepare data for Excel
    const updatedBets = await Promise.all(
      bets.map(async (bet) => {
        const user = await User.findById(bet.createdBy);
        return {
          ...bet.toObject(),
          name: user ? user.name.toLowerCase() : "unknown first name",
          lastName: user ? user.lastName.toLowerCase() : "unknown last name",
          nickname: user ? user.nickname.toLowerCase() : "unknown nickname",
          location: location
            ? location.locationName.toLowerCase()
            : "unknown location",
        };
      })
    );

    // Prepare data for Excel
    const dataForExcel = updatedBets.map((bet) => ({
      Time: formatDateTimeToCET(bet.updatedAt),
      Name: capitalizeFirstLetters(`${bet.name} ${bet.lastName}`),
      Nickname: capitalizeFirstLetters(bet.nickname),
      Driver1: capitalizeFirstLetters(bet.driver1),
      Driver2: capitalizeFirstLetters(bet.driver2),
      Driver3: capitalizeFirstLetters(bet.driver3),
      Driver4: capitalizeFirstLetters(bet.driver4),
      Driver5: capitalizeFirstLetters(bet.driver5),
      Team: capitalizeFirstLetters(bet.teamName),
      Location: capitalizeFirstLetters(bet.location),
    }));

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
    xlsx.utils.book_append_sheet(workbook, worksheet, "MyDrivers");

    // Stream the file to the client
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set headers for response
    res.setHeader(
      "Content-Disposition",
      'attachment; filename= "MokasF1Jatek (válaszok).xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the buffer as a stream to the response
    res.end(excelBuffer);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ error: "Failed to generate Excel file" });
  }
};

export { getMyDrivers, createMyDrivers, updateMyDrivers, getMyDriversExcel };
