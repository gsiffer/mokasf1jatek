import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Constructor from "../models/Constructor.js";

const createConstructor = async (req, res) => {
  const { constructorName } = req.body;
  if (!constructorName) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const constructor = await Constructor.create(req.body);

  res.status(StatusCodes.CREATED).json({ constructor });
};

const getAllConstructor = async (req, res) => {
  const { sort } = req.query;

  // No await
  let result = Constructor.find({});

  // chain sort condition
  if (sort === "a-z") {
    result = result.sort("constructorName");
  }
  if (sort === "z-a") {
    result = result.sort("-constructorName");
  }

  const constructors = await result;

  res.status(StatusCodes.OK).json({ constructors });
};

const updateConstructor = async (req, res) => {
  const { id: constructorId } = req.params;

  const { constructorName } = req.body;

  if (!constructorName) {
    throw new BadRequestError("Please Provide All Values");
  }

  const constructor = await Constructor.findOne({ _id: constructorId });

  if (!constructor) {
    throw new NotFoundError(`No constructor with id ${constructorId}`);
  }

  const updatedConstructor = await Constructor.findOneAndUpdate(
    { _id: constructorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedConstructor });
};

const deleteConstructor = async (req, res) => {
  const { id: constructorId } = req.params;

  const constructor = await Constructor.findOne({ _id: constructorId });

  if (!constructor) {
    throw new NotFoundError(`No constructor with id : ${constructorId}`);
  }

  await constructor.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Constructor removed" });
};

export {
  createConstructor,
  getAllConstructor,
  updateConstructor,
  deleteConstructor,
};
