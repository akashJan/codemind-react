import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const Dashboard = () => {
  const { tasks, user, deleteTask, logoutUser } = useContext(TaskContext);
  // const userTasks = tasks.filter((task) => );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDeadline, setFilterDeadline] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.createdBy === user?.email &&
      (searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterCategory === "" || task.category === filterCategory) &&
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterDeadline === "" || task.deadline === filterDeadline)
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">
            {user && <p>Welcome, {user.name || "User"} !</p>}
          </div>
          <h2 className="text-center font-bold text-3xl">Dashboard</h2>
          <div className="space-x-2 mt-2 md:mt-0">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600"
            >
              Logout
            </button>
            <Link to="/add">
              <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
                Add Task
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search Tasks"
            arial-label="Search Tasks"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            aria-label="Filter by Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
          </select>
          <select
            aria-label="Filter by Priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={filterDeadline}
            onChange={(e) => setFilterDeadline(e.target.value)}
            arial-label="Filter by Deadline"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <h3 className="text-lg font-semibold mb-4">Tasks</h3>
        <ul className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={tasks.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="text-gray-800">
                  <p className="font-medium">
                    Title: {task.title} | Description: {task.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {task.category} | Priority: {task.priority} |
                    Deadline:{task.deadline}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 space-x-2">
                  <Link to={`/edit/${task.id}`}>
                    <button className="bg-yellow-400 text-white px-3 py-1 text-sm rounded hover:bg-yellow-500">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-yellow-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No tasks found.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
