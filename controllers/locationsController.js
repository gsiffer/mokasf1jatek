import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Location from "../models/Location.js";
import setIsLocationActiveToFalse from "../utils/setIsLocationActiveToFalse.js";

const createLocation = async (req, res) => {
  const { locationName, locationCloseDate, isLocationActive } = req.body;
  if (!locationName || !locationCloseDate) {
    throw new BadRequestError("Please provide all values");
  }

  if (isLocationActive) {
    await setIsLocationActiveToFalse(Location);
  }

  req.body.createdBy = req.user.userId;
  const location = await Location.create(req.body);

  res.status(StatusCodes.CREATED).json({ location });
};

const getAllLocation = async (req, res) => {
  let result = Location.find({}).sort({ locationCloseDate: 1 }); // ascending order;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  // 75
  // 10 10 10 10 10 10 10 5

  const locations = await result;

  const totalLocations = await Location.countDocuments({});
  const numOfLocationsPages = Math.ceil(totalLocations / limit);

  res
    .status(StatusCodes.OK)
    .json({ locations, totalLocations, numOfLocationsPages });
};

const updateLocation = async (req, res) => {
  const { id: locationId } = req.params;

  const { locationName, isLocationActive } = req.body;

  if (!locationName) {
    throw new BadRequestError("Please Provide All Values");
  }

  if (isLocationActive) {
    await setIsLocationActiveToFalse(Location);
  }

  const location = await Location.findOne({ _id: locationId });

  if (!location) {
    throw new NotFoundError(`No location with id ${locationId}`);
  }

  const updatedLocation = await Location.findOneAndUpdate(
    { _id: locationId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedLocation });
};

const deleteLocation = async (req, res) => {
  const { id: locationId } = req.params;

  const location = await Location.findOne({ _id: locationId });

  if (!location) {
    throw new NotFoundError(`No location with id : ${locationId}`);
  }

  await location.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Location removed" });
};

export { createLocation, getAllLocation, updateLocation, deleteLocation };
