import React, { useState } from "react";
import { deleteTask, updateTaskStatus } from "../services/task.api";
import { toast } from "sonner";
import EditTaskModel from "./EditTaskModel";

const TaskCard = ({ task, setTasks }) => {
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      const confirm = window.confirm("Do want to delete task");
      if (!confirm) return;

      const res = await deleteTask(id);

      if (res.status === 200) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }
      toast.success("Task deleted");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      setLoading(true);
      const res = await updateTaskStatus(id);
      const updatedTask = res.data.data;

      if (res.status === 200) {
        setTasks(
          (prev) =>
            prev.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ), //replacing task with updated version
        );
        toast.success("Task status updated");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (task) => {
    setSelectedTask(task);
    setIsEditOpen(true)
  };

  return (
  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <h2 className="text-lg font-semibold text-gray-800">
        {task.title}
      </h2>

      <span
        className={`text-xs px-2 py-1.5 rounded-full font-medium ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : task.status === "in-progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {task.status}
      </span>
    </div>

    <p className="text-sm text-gray-600 mt-3">
      {task.description}
    </p>

    <div className="mt-4 space-y-1 text-sm">
      <p className="text-gray-700">
        <span className="font-medium">Category:</span>{" "}
        {task.category_name}
      </p>
    </div>

    <div className="flex gap-2 mt-5">
      <button
        className="flex-1 bg-blue-500 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
        onClick={() => handleEditClick(task)}
      >
        Edit
      </button>

      <button
        className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
        onClick={() => handleDelete(task.id)}
      >
        Delete
      </button>

      <button
        disabled={loading}
        className="flex-1 bg-green-500 text-white py-2 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50"
        onClick={() => handleMarkDone(task.id)}
      >
        Done
      </button>
    </div>

    {isEditOpen && (
      <EditTaskModel
        task={selectedTask}
        onClose={() => setIsEditOpen(false)}
        setTasks={setTasks}
      />
    )}
  </div>
);
};

export default TaskCard;
