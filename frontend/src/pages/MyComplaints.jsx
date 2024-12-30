import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/myComplaints", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setErrorMessage("Failed to load your complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDeleteComplaint = async (complaintId) => {
    try {
      const response = await API.delete(`/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint._id !== complaintId)
        );
        console.log("Complaint deleted successfully");
      } else {
        throw new Error(`Error deleting complaint: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
      setErrorMessage("Failed to delete complaint.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="text-xl font-semibold animate-pulse text-[#003161]">
          Loading your complaints...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF4B7] p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
            My Complaints
          </h1>

          {errorMessage && (
            <div className="text-red-500 font-semibold mb-4">
              {errorMessage}
            </div>
          )}

          {complaints.length === 0 ? (
            <div className="bg-[#FFEBEE] text-[#D32F2F] p-4 rounded-lg text-center font-semibold text-xl shadow-md">
              No complaints found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-[#006A67]">
                <thead>
                  <tr className="bg-[#31807d] text-[#FFF4B7]">
                    <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                      Type
                    </th>
                    <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                      Description
                    </th>
                    <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-32">
                      Status
                    </th>
                    <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                      Date
                    </th>
                    <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, index) => (
                    <tr
                      key={complaint._id}
                      className={`${
                        index % 2 === 0 ? "bg-[#E6F0F1]" : "bg-[#D0E8E7]"
                      }`}
                    >
                      <td className="px-4 py-2 border border-[#006A67] text-center">
                        {complaint.type}
                      </td>
                      <td className="px-4 py-2 border border-[#006A67] text-center break-words">
                        {complaint.description}
                      </td>
                      <td className="px-4 py-2 border border-[#006A67] text-center">
                        {complaint.status}
                      </td>
                      <td className="px-4 py-2 border border-[#006A67] text-center">
                        {new Date(complaint.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border border-[#006A67] text-center">
                        <button
                          onClick={() => handleDeleteComplaint(complaint._id)}
                          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyComplaints;
