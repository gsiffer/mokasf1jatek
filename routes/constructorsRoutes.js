import express from "express";
const router = express.Router();
import {
  createConstructor,
  getAllConstructor,
  deleteConstructor,
  updateConstructor,
} from "../controllers/constructorsController.js";

router.route("/").post(createConstructor).get(getAllConstructor);
router.route("/:id").delete(deleteConstructor).patch(updateConstructor);

export default router;
