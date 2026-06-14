import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../validations/task.validation";
import { useEffect, useState } from "react";
import { getCategory } from "../services/category.api";
import { toast } from "sonner";
import { createTask } from "../services/task.api";

const inputClass =
  "w-full text-sm py-2 px-4 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-blue-500";
const AddTaskModel = ({ isOpen, onClose, setTasks }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTaskSchema),
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
    fetchCategories();
  }, []);

  const submitHandler = async (data) => {
    try {
        setLoading(true);

        const res = await createTask(data);
        const newTask = res.data.data;

        if(res.status === 201) {
          setTasks((prev) => [newTask, ...prev]);     //important 
            toast.success("Task added successfully")
            reset();
            onClose();
        }
        
    } catch (error) {
        const message = error.res.data.message || "Failed to add task"
        toast.error(message)
        
    }finally{
        setLoading(false)
    }
  };

  if(!isOpen) return;

  return (
    <div className=" fixed flex justify-center items-center z-50 backdrop-blur inset-0 bg-black/40 ">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg">
        {/* header */}
        <div className="flex justify-between">
          <h2 className="text-xl text-gray-700 font-medium">Add Your Task</h2>
          <button
            className="bg-gray-100 p-2 rounded-full text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 text-sm">Title : </label>
            <input
              type="text"
              {...register("title")}
              placeholder="enter task title"
              className={inputClass}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Category : </label>
            <select {...register("category_id")} className={inputClass}>
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <p className="text-xs text-red-500 mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Description : </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="enter task description"
              className={inputClass}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
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
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModel;
