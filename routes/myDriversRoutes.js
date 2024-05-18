import express from "express";
const router = express.Router();
import {
  getMyDrivers,
  createMyDrivers,
  updateMyDrivers,
} from "../controllers/myDriversController.js";

router.route("/").post(createMyDrivers).get(getMyDrivers);
router.route("/:id").patch(updateMyDrivers);

export default router;
