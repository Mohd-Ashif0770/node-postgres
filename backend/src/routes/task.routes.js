import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";
import validate from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js";

const router = express.Router();

router.post("/", validate(createTaskSchema), createTask);
router.get("/", getAllTask);
router.get("/:id", getTaskById);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
