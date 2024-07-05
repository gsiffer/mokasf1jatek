import express from "express";
const router = express.Router();
import {
  getMyDrivers,
  createMyDrivers,
  updateMyDrivers,
  getMyDriversExcel,
} from "../controllers/myDriversController.js";
import authUserRole from "../middleware/authUserRole.js";

router.route("/").post(createMyDrivers).get(getMyDrivers);
router.route("/:id").patch(updateMyDrivers);
router.route("/excel").get(authUserRole, getMyDriversExcel);

export default router;
