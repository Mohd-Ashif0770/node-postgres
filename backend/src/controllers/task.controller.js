import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  getTaskByIdService,
  updateTaskService,
  updateTaskStatusService,
} from "../services/task.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, category_id } = req.body;

    const task = await createTaskService(title, description, category_id);
    if (!task) {
      return errorResponse(res, 400, "Failed to create task");
    }

    return successResponse(res, 201, "Task created successfully", task);
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const tasks = await getAllTaskService();
    if (tasks.length === 0) {
      return errorResponse(res, 404, "Tasks not found");
    }

    return successResponse(res, 200, "Tasks fetched successfully", tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdService(req.params.id);
    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    return successResponse(res, 200, "Task fetched successfully", task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, category_id } = req.body;
    const { id } = req.params;

    const task = await updateTaskService(
      id,
      title,
      description,
      status,
      category_id,
    );
    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    return successResponse(res, 200, "Task updated successfully", task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = "completed"

    const task = await updateTaskStatusService(id, status);

    return successResponse(res, 200, "Task status updated", task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await deleteTaskService(id);
    if (!task) {
      return errorResponse(res, 404, "Task not found");
    }

    return successResponse(res, 200, "Task deleted successfully", task);
  } catch (error) {
    next(error);
  }
};
