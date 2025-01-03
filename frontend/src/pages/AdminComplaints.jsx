import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import API from "../api";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [remark, setRemark] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await API.get("/admin/complaints", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setErrorMessage("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleAction = async (complaintId, status) => {
    if (status === "Rejected" && !remark.trim()) {
      alert("Please provide a remark before rejecting.");
      return;
    }

    try {
      const { data } = await API.patch(
        `/admin/complaints/${complaintId}`,
        { status, response: remark },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, status: data.status, response: data.response }
            : complaint
        )
      );

      setRemark("");
      setCurrentComplaint(null);
    } catch (error) {
      console.error("Error updating complaint:", error);
      setErrorMessage("Failed to update complaint.");
    }
  };

  const handleDelete = async (complaintId) => {
    try {
      await API.delete(`/admin/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== complaintId)
      );
    } catch (error) {
      console.error("Error deleting complaint:", error);
      setErrorMessage("Failed to delete complaint.");
    }
  };

  const closeRemarkModal = () => {
    setRemark("");
    setCurrentComplaint(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="text-xl font-semibold animate-pulse text-[#003161]">
          Loading complaints...
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
            Complaints Dashboard
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
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Name
                    </th>
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Ration Card
                    </th>
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Type
                    </th>
                    <th className="px-8 py-4 text-center w-1/3 border border-black">
                      Description
                    </th>
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Status
                    </th>
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Remark
                    </th>
                    <th className="px-8 py-4 text-center w-1/6 border border-black">
                      Actions
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
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        {complaint.userId?.name || "N/A"}
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        {complaint.rationCardNumber || "N/A"}
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        {complaint.type}
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        {complaint.description}
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        <span
                          className={`px-4 py-2 rounded-full text-white ${
                            complaint.status === "Resolved"
                              ? "bg-green-500"
                              : complaint.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        {complaint.response || "N/A"}
                      </td>
                      <td className="px-8 py-4 text-center border border-[#006A67]">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setCurrentComplaint(complaint)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600"
                          >
                            Resolve
                          </button>
                          <button
                            onClick={() => setCurrentComplaint(complaint)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleDelete(complaint._id)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Remark Input */}
        {currentComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 md:w-1/3 relative">
              <button
                onClick={closeRemarkModal}
                className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4 text-[#003161]">
                Add Remark
              </h2>
              <textarea
                className="w-full p-4 border rounded-lg mb-4 border-gray-300"
                rows="5"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter your remark..."
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-green-600"
                  onClick={() => handleAction(currentComplaint._id, "Resolved")}
                >
                  Resolve
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleAction(currentComplaint._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminComplaints;
