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

  result = result.sort("firstName");

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
  res.status(StatusCodes.OK).send("Update driver");
};

const deleteDriver = async (req, res) => {
  res.status(StatusCodes.OK).send("Delete driver");
};

export { createDriver, getAllDriver, updateDriver, deleteDriver };
