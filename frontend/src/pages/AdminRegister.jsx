import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import NavbarHome from "../components/NavbarHome";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/admin/register", formData);
      setSuccess(data.message);
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center text-[#003161] mb-6">
            Admin Register
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-[#003161] font-medium mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border bg-[#E6F0F1] border-[#006A67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003161]"
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label
                htmlFor="secretKey"
                className="block text-[#003161] font-medium mb-2"
              >
                Secret Key:
              </label>
              <input
                type="text"
                name="secretKey"
                id="secretKey"
                value={formData.secretKey}
                onChange={handleChange}
                required
                className="w-full p-3 border bg-[#E6F0F1] border-[#006A67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003161]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#006A67] text-white font-semibold rounded-md hover:bg-[#003161] focus:outline-none focus:ring-2 focus:ring-[#003161]"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-[#003161]">
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="text-[#359af8] hover:text-[#003161]"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
