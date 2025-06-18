import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpUser } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    signUpUser(userData);
    toast.success("User signed up successfully! 🎉", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Navigate after slight delay to allow toast display
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <div className="w-full max-w-md mx-2 rounded shadow-lg border bg-white">
        <h2 className="text-2xl font-bold py-3 text-center text-gray-800  bg-gray-100 border ">
          SignUp
        </h2>
        <form className="px-4 mt-4" onSubmit={handleSubmit}>
          <div className="my-1">
            <label>Name</label> <br />
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border w-full rounded"
            />
          </div>
          <div className="my-1">
            <label>Email</label> <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border w-full rounded"
            />
          </div>
          <div className="my-1">
            <label>Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border w-full rounded"
            />
          </div>
          <button
            className="bg-blue-600 text-center w-full mt-3 py-1 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mx-4 mb-5">
          Already Registered?{" "}
          <Link to="/" className="text-blue-400 underline">
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
