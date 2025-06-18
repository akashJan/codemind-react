import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md mx-2  rounded shadow-lg border bg-white">
        <h2 className="text-2xl font-bold py-3 text-center text-gray-800  bg-gray-100 border ">
          Login
        </h2>
        <form className="px-4 mt-4" onSubmit={handleSubmit}>
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
          <div className="mb-1">
            <label>Password</label> <br />
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
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="mx-4 mb-5">
          Don't have account?{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
