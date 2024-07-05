import express from "express";
const router = express.Router();
import {
  createConstructor,
  getAllConstructor,
  deleteConstructor,
  updateConstructor,
} from "../controllers/constructorsController.js";
import authUserRole from "../middleware/authUserRole.js";

router.route("/").post(authUserRole, createConstructor).get(getAllConstructor);
router
  .route("/:id")
  .delete(authUserRole, deleteConstructor)
  .patch(authUserRole, updateConstructor);

export default router;
