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

const getAllDrivers = async (req, res) => {
  // No await
  const drivers = await Driver.find().populate({
    path: "teamName",
    model: "Constructor",
    select: "constructorName",
  });

  res.status(StatusCodes.OK).json({ drivers });
};

const getAllDriverPerPage = async (req, res) => {
  const results = await Driver.find().populate({
    path: "teamName",
    model: "Constructor",
    select: "constructorName",
  });

  results.sort((a, b) => {
    if (!a.teamName && !b.teamName) return 0;
    if (!a.teamName) return 1;
    if (!b.teamName) return -1;

    return a.teamName.constructorName.localeCompare(
      b.teamName.constructorName,
      "en",
      {
        sensitivity: "base",
      }
    );
  });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const drivers = results.slice(skip, skip + limit);

  // // setup pagination
  // // const page = Number(req.query.page) || 1;
  // // const limit = Number(req.query.limit) || 10;
  // // const skip = (page - 1) * limit; //10
  // // result = result.skip(skip).limit(limit);
  // // 75
  // // 10 10 10 10 10 10 10 5

  // // const drivers = await result;

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

export {
  createDriver,
  getAllDrivers,
  getAllDriverPerPage,
  updateDriver,
  deleteDriver,
};
