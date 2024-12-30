import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    rationCardNumber: "",
    name: "",
    familyMembers: "",
    password: "",
    contactNumber: "",
  });

  const [quota, setQuota] = useState({ rice: 0, wheat: 0, sugar: 0 });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      if (name === "familyMembers") {
        const updatedQuota = calculateQuota(value);
        setQuota(updatedQuota);
      }

      return updatedFormData;
    });
  };

  const calculateQuota = (familyMembers) => {
    const riceQuota = familyMembers * 3;
    const wheatQuota = familyMembers * 5;
    const sugarQuota = familyMembers * 4;

    return { rice: riceQuota, wheat: wheatQuota, sugar: sugarQuota };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", formData);
      localStorage.removeItem("token");

      const { data } = await API.post("/login", {
        rationCardNumber: formData.rationCardNumber,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
          Register
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
              htmlFor="familyMembers"
              className="block text-[#003161] font-medium mb-2"
            >
              Family Members:
            </label>
            <input
              type="number"
              name="familyMembers"
              id="familyMembers"
              value={formData.familyMembers}
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
              htmlFor="contactNumber"
              className="block text-[#003161] font-medium mb-2"
            >
              Contact Number:
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border bg-[#E6F0F1] border-[#006A67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003161]"
            />
          </div>

          {/* Displaying the calculated quota */}
          <div className="mb-4">
            <p className="text-[#003161]">
              <strong>Quota:</strong> Rice: {quota.rice} kg, Wheat:{" "}
              {quota.wheat} kg, Sugar: {quota.sugar} kg
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006A67] text-white font-semibold rounded-md hover:bg-[#003161] focus:outline-none focus:ring-2 focus:ring-[#003161]"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#359af8] hover:text-[#003161]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
