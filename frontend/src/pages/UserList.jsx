import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await API.get("/users");
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        console.error(
          "Error fetching user list:",
          error.response?.data || error.message
        );
        setError("Failed to load user list.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  if (loading) {
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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
          <div className="text-xl font-semibold animate-pulse text-red-500">
            {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
            User List
          </h1>

          <table className="table-auto w-full border-collapse border border-[#006A67]">
            <thead>
              <tr className="bg-[#006A67] text-[#FFF4B7]">
                <th className="border border-[#0a0a0a] px-4 py-2 text-center">
                  Name
                </th>
                <th className="border border-[#006A67] px-4 py-2 text-center">
                  Ration Card Number
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#E6F0F1]" : "bg-[#D0E8E7]"
                    } hover:bg-[#E6F0F1]`}
                  >
                    <td className="border border-[#006A67] text-center px-4 py-2 text-[#003161]">
                      {user.name}
                    </td>
                    <td className="border border-[#006A67] text-center px-4 py-2 text-[#003161]">
                      {user.rationCardNumber}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
