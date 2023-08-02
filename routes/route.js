import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  markToDone,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", markToDone);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
