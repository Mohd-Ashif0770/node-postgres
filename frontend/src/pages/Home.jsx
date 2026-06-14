import React, { useEffect, useState } from "react";
import { getAllTask } from "../services/task.api";
import TaskCard from "../components/TaskCard";
import AddTaskModel from "../components/AddTaskModel";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTask();

        if (res.status === 200) {
          setTasks(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTasks();
  }, []);

  //filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter && task.status !== statusFilter) {
      return false;
    }

    if (categoryFilter && task.category_name !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full px-8 mt-10 flex flex-col">
      <div className="flex justify-between mb-10">
        <h2 className="text-xl text-green-500 font-medium">Manage Your Task</h2>
        <div className="flex justify-between gap-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-400 rounded-lg text-sm outline-none focus:border-blue-500 px-2 "
          >
            <option value="">Category</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-400 rounded-lg text-sm outline-none focus:border-blue-500 px-2"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="bg-green-500 text-white py-1.5 px-3 rounded cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            + Add Task
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} />
        ))}
      </div>

      {isOpen && (
        <AddTaskModel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setTasks={setTasks}
        />
      )}
    </div>
  );
};

export default Home;
