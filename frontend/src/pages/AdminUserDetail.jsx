import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import API from "../api";

const AdminUserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await API.get(`/admin/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setUser(data);
      } catch (error) {
        setError("Error fetching user details."); // Set error message
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p> {/* Display error message */}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF4B7] p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-[#003161] to-[#006A67] text-white p-6">
            <h1 className="text-3xl font-bold text-center">User Details</h1>
          </header>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* User Info */}
              <div className="p-4 bg-[#E6F0F1] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-[#003161] mb-2">
                  User Information
                </h2>
                <p className="text-[#003161]">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Ration Card Number:</span>{" "}
                  {user.rationCardNumber}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Family Members:</span>{" "}
                  {user.familyMembers}
                </p>
                <p className="text-[#003161]">
                  <span className="font-semibold">Contact Number:</span>{" "}
                  {user.contactNumber}
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
                    {user.quota.rice} kg
                  </li>
                  <li className="text-[#003161]">
                    <span className="font-semibold">Wheat:</span>{" "}
                    {user.quota.wheat} kg
                  </li>
                  <li className="text-[#003161]">
                    <span className="font-semibold">Sugar:</span>{" "}
                    {user.quota.sugar} kg
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-6 py-2 bg-[#006A67] hover:bg-[#003161] text-white rounded-lg shadow transition-all duration-300"
                onClick={() => window.history.back()} // Navigate back
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserDetail;
