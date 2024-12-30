import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const [formData, setFormData] = useState({
    rationCardNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", formData);
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
          Login
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="rationCardNumber"
              className="block text-[#003161] font-medium mb-2"
            >
              Ration Card Number:
            </label>
            <input
              type="text"
              name="rationCardNumber"
              id="rationCardNumber"
              value={formData.rationCardNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border bg-[#E6F0F1] border-[#006A67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003161]"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-[#003161] font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border bg-[#E6F0F1] border-[#006A67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003161]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006A67] text-white font-semibold rounded-md hover:bg-[#003161] focus:outline-none focus:ring-2 focus:ring-[#003161]"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-[#359af8] hover:text-[#003161]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
