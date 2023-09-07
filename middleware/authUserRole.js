import User from "../models/User.js";
import { UnauthenticatedError } from "../errors/index.js";

const authUserRole = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (user.role !== "admin") {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  next();
};

export default authUserRole;
