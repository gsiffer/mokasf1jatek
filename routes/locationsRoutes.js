import express from "express";
const router = express.Router();
import {
  createLocation,
  getAllLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationsController.js";
import authUserRole from "../middleware/authUserRole.js";

router.route("/").post(authUserRole, createLocation).get(getAllLocation);
router
  .route("/:id")
  .delete(authUserRole, deleteLocation)
  .patch(authUserRole, updateLocation);

export default router;
