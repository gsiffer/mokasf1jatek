import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Driver from "../models/Driver.js";

const createDriver = async (req, res) => {
  const { firstName, lastName, teamName } = req.body;
  if (!firstName || !lastName || !teamName) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const driver = await Driver.create(req.body);

  res.status(StatusCodes.CREATED).json({ driver });
};

const getAllDriver = async (req, res) => {
  let result = Driver.find({});

  result = result.sort("teamName");

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  // 75
  // 10 10 10 10 10 10 10 5

  const drivers = await result;

  const totalDrivers = await Driver.countDocuments({});
  const numOfDriversPages = Math.ceil(totalDrivers / limit);

  res.status(StatusCodes.OK).json({ drivers, totalDrivers, numOfDriversPages });
};

const updateDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const { firstName, lastName, teamName } = req.body;

  if (!firstName && !lastName && !teamName) {
    throw new BadRequestError("Please Provide All Values");
  }

  const driver = await Driver.findOne({ _id: driverId });

  if (!driver) {
    throw new NotFoundError(`No driver with id ${driverId}`);
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

  const updatedDriver = await Driver.findOneAndUpdate(
    { _id: driverId },
    lowercaseBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedDriver });
};

const deleteDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const driver = await Driver.findOne({
    _id: driverId,
  });

  if (!driver) {
    throw new NotFoundError(`No driver with id : ${driverId}`);
  }

  await driver.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Driver removed" });
};

export { createDriver, getAllDriver, updateDriver, deleteDriver };
