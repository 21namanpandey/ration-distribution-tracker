import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert("Failed to load user data");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
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
      <div className="min-h-screen bg-[#FFF4B7] p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-[#003161] to-[#006A67] text-white p-6">
            <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
          </header>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* User Info */}
              <div className="p-4 bg-[#E6F0F1] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-[#003161] mb-2">
                  User Information
                </h2>
                <p className="text-[#003161]">
                  <span className="font-semibold">Name:</span> {userData.name}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Ration Card Number:</span>{" "}
                  {userData.rationCardNumber}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Family Members:</span>{" "}
                  {userData.familyMembers}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Contact Number:</span>{" "}
                  {userData.contactNumber}
                </p>
              </div>

              {/* Ration Details */}
              <div className="p-4 bg-[#E6F0F1] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-[#003161] mb-2">
                  Ration Details
                </h2>
                <ul className="space-y-2">
                  <li className="text-[#003161]">
                    <span className="font-semibold">Rice:</span>{" "}
                    {userData.quota.rice} kg
                  </li>
                  <li className="text-[#003161]">
                    <span className="font-semibold">Wheat:</span>{" "}
                    {userData.quota.wheat} kg
                  </li>
                  <li className="text-[#003161]">
                    <span className="font-semibold">Sugar:</span>{" "}
                    {userData.quota.sugar} kg
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-6 py-2 bg-[#006A67] hover:bg-[#003161] text-white rounded-lg shadow transition-all duration-300"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
