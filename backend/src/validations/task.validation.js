import { z } from "zod";

const TaskStatusEnum = z.enum([
  "pending",
  "in-progress",
  "completed",
], {
    error: "Status must be pending, in-progress, or completed"
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.coerce.number().min(1, "Category id is required"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  status: TaskStatusEnum.optional(),
  category_id: z.coerce.number().min(1, "Category id is required").optional(),
});

export const updateTaskStatusSchema = z.object({
  status: TaskStatusEnum
})
