import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddEditTask from "./components/AddEditTask";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEditTask />} />
          <Route path="/edit/:id" element={<AddEditTask />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
