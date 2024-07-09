import express from "express";
const router = express.Router();
import {
  createDriver,
  getAllDriverPerPage,
  getAllDrivers,
  updateDriver,
  deleteDriver,
} from "../controllers/driversController.js";
import authUserRole from "../middleware/authUserRole.js";

router.route("/").post(authUserRole, createDriver).get(getAllDrivers);
router.route("/page").get(getAllDriverPerPage);
router
  .route("/:id")
  .delete(authUserRole, deleteDriver)
  .patch(authUserRole, updateDriver);

export default router;
