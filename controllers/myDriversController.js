import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Location from "../models/Location.js";
import MyDrivers from "../models/MyDrivers.js";
import formatDateTimeToCET from "../utils/formatDateTimeToCET.js";

const getMyDrivers = async (req, res) => {
  const location = await Location.findOne({ isLocationActive: true });

  let locationCloseDate = null;
  let myDrivers = null;

  if (location) {
    myDrivers = await MyDrivers.findOne({
      locationName: location._id,
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
  } else if (
    formatDateTimeToCET(location.locationCloseDate) < formatDateTimeToCET()
  ) {
    throw new BadRequestError("The time has expired");
  }

  const count = await MyDrivers.countDocuments({ locationName: location._id });

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
  } else if (
    formatDateTimeToCET(location.locationCloseDate) < formatDateTimeToCET()
  ) {
    throw new BadRequestError("The time has expired");
  }

  const myDrivers = await MyDrivers.findOne({ _id: myDriverId });
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

export { getMyDrivers, createMyDrivers, updateMyDrivers };
