import express from "express";
const router = express.Router();
import { getMyDrivers } from "../controllers/myDriversController.js";

router.route("/").get(getMyDrivers);
// router.route("/").post(createJob).get(getAllJob);
// router.route("/stats").get(showStats);
// router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
