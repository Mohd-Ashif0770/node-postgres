import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateTaskSchema } from "../validations/task.validation";
import { X } from "lucide-react";
import { getCategory } from "../services/category.api";
import { toast } from "sonner";
import { updateTask } from "../services/task.api";

const inputClass =
  "w-full border border-gray-300 text-sm rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500";

const EditTaskModel = ({ task, onClose, setTasks }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        if (res.status === 200) {
          console.log(res.data.data);
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    reset(task);
    fetchCategories();
  }, [task, reset]);

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const res = await updateTask(task.id, data);
      const updatedTask = res.data.data;

      if (res.status === 200) {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? updatedTask : t)),
        );

        toast.success("Task updated successfully");
        onClose();
      }
    } catch (error) {
      console.log(error.message);
      const message = error.res.data.message || "Failed to update task";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 backdrop-blur-sm z-50 bg-black/40">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        {/* header */}
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-blue-500">Edit your task</h2>
          <button
            className="bg-gray-50 p-2 rounded-full text-gray-500 cursor-pointer"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 text-sm">Title</label>
            <input type="text" {...register("title")} className={inputClass} />
            {errors.title && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select className={inputClass} {...register("status")}>
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Category</label>
            <select className={inputClass} {...register("category_id")}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className={inputClass}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-1.5 px-4 rounded font-medium cursor-pointer"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModel;
