import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import NavbarHome from "../components/NavbarHome";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/admin/login", formData);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center text-[#003161] mb-6">
            Admin Login
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[#003161] font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
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
          <p className="text-center mt-4 text-[#003161]">
            Don't have an account?{" "}
            <a
              href="/admin/register"
              className="text-[#359af8] hover:text-[#003161]"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
