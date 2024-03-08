import express from "express";
const router = express.Router();
import {
  createDriver,
  getAllDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driversController.js";

router.route("/").post(createDriver).get(getAllDriver);
router.route("/:id").delete(deleteDriver).patch(updateDriver);

export default router;
