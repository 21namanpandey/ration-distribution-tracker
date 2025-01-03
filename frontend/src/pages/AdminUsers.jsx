import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import API from "../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="text-xl font-semibold animate-pulse text-[#003161]">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF4B7] p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-[#003161] mb-8 text-center">
            All Registered Users
          </h1>

          {users.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#E6F0F1] p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h2 className="text-xl font-semibold text-[#003161]">{user.name}</h2>
                  <p className="text-[#003161] text-sm mb-4">
                    <span className="font-semibold">Ration Card Number:</span> {user.rationCardNumber}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-[#006A67] hover:bg-[#003161] text-white rounded-lg shadow transition-all duration-300"
                      onClick={() => handleViewUser(user._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
