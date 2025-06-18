import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const AddEditTask = () => {
  const { addTask, editTask, tasks, user } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reminder, setReminder] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  console.log("All tasks:", tasks);
  console.log("Edit ID from URL:", id);

  useEffect(() => {
    console.log("Tasks:", tasks);
    console.log("Edit ID:", id);

    // Important: wait for tasks to be loaded
    if (id && tasks.length > 0) {
      const taskToEdit = tasks.find((task) => String(task.id) === String(id));
      console.log("Found Task:", taskToEdit);

      if (taskToEdit) {
        setTitle(taskToEdit.title || "");
        setDescription(taskToEdit.description || "");
        setCategory(taskToEdit.category || "");
        setPriority(taskToEdit.priority || "");
        setDeadline(taskToEdit.deadline || "");
        setReminder(taskToEdit.reminder || "");
      } else {
        console.warn("No task found for ID:", id);
      }
    }
  }, [id, tasks]);

  //Form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: id || crypto.randomUUID(),
      title,
      description,
      category,
      priority,
      deadline,
      reminder,
      createdBy: user?.email,
    };
    if (id) {
      editTask(id, newTask);
    } else {
      addTask(newTask);
    }
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-8">
        {id ? "Edit Task" : "Add Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mb-2">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Learning</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="reminder"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Reminder
          </label>
          <input
            id="reminder"
            type="datetime-local"
            value={reminder}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setReminder(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <hr className="my-6" />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition "
        >
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddEditTask;
