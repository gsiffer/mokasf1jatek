import express from "express";
const router = express.Router();
import {
  getTeamStandings,
  createTeamStandings,
  updateTeamStandings,
} from "../controllers/TeamStandingsController.js";
import authUserRole from "../middleware/authUserRole.js";

router.route("/").post(authUserRole, createTeamStandings).get(getTeamStandings);
router.route("/:id").patch(authUserRole, updateTeamStandings);

export default router;
