import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // User Register

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Function to sign up new user
  const signUpUser = (userData) => {
    setUsers([...users, userData]);
    setUser(userData);
  };

  // User Login

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Function to login user
  const loginUser = (email, password) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  //   Tasks
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Edit task
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };
  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // logout
  const logoutUser = () => {
    setUser(null);
  };

  // Function to check reminders for tasks
  const checkReminders = () => {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.reminder && new Date(task.reminder <= now)) {
        alert(`Reminder: ${task.title}`);
        editTask(task.id, { ...task, reminder: null });
      }
    });
  };

  // Use effect to check reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        user,
        loginUser,
        signUpUser,
        logoutUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
