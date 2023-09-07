import { StatusCodes } from "http-status-codes";
import Location from "../models/Location.js";

const getMyDrivers = async (req, res) => {
  const location = await Location.findOne({ isLocationActive: true });

  let locationCloseDate = null;

  if (location) {
    locationCloseDate = location.locationCloseDate;
  }

  res.status(StatusCodes.OK).json({ locationCloseDate });
};

export { getMyDrivers };
