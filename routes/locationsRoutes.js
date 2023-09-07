import express from "express";
const router = express.Router();
import {
  createLocation,
  getAllLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationsController.js";

router.route("/").post(createLocation).get(getAllLocation);
router.route("/:id").delete(deleteLocation).patch(updateLocation);

export default router;
