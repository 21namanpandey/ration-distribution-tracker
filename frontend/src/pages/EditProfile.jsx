import React, { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    familyMembers: "",
    contactNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not authenticated!");
          return;
        }

        const { data } = await API.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(data);
        setFormData({
          name: data.name || "",
          familyMembers: data.familyMembers || "",
          contactNumber: data.contactNumber || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authenticated!");
        return;
      }

      const { data } = await API.put(
        "/user/update",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
          <div className="text-xl font-semibold animate-pulse text-[#003161]">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF4B7] flex justify-center items-center p-6">
        <div className="bg-white p-6 w-full sm:w-96 rounded-lg shadow-md">
          <h1 className="text-2xl flex justify-center font-semibold text-[#003161] mb-6">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-[#003161] text-sm mb-2 font-bold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#E6F0F1] text-[#003161] rounded-md py-2 px-3 border border-[#006A67] focus:outline-none focus:ring-1 focus:ring-[#003161] placeholder:text-[#A2B5B4]"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="familyMembers"
                className="block text-[#003161] text-sm mb-2 font-bold"
              >
                Family Members
              </label>
              <input
                type="text"
                id="familyMembers"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                className="w-full bg-[#E6F0F1] text-[#003161] rounded-md py-2 px-3 border border-[#006A67] focus:outline-none focus:ring-1 focus:ring-[#003161] placeholder:text-[#A2B5B4] "
                placeholder="Enter family members"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-[#003161] text-sm mb-2 font-bold"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full bg-[#E6F0F1] text-[#003161] rounded-md py-2 px-3 border border-[#006A67] focus:outline-none focus:ring-1 focus:ring-[#003161] placeholder:text-[#A2B5B4]"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#006A67] text-white py-2 rounded-md hover:bg-[#003161] focus:outline-none focus:ring-1 focus:ring-[#003161]"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
