import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

const Complaints = () => {
  const [formData, setFormData] = useState({
    type: "Quota Issue",
    description: "",
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        console.error("Error fetching user data:", error);
        alert("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!userData) {
        alert("User data not available");
        return;
      }

      // Add the rationCardNumber from the logged-in user's data
      const dataToSubmit = { ...formData, rationCardNumber: userData.rationCardNumber };

      const response = await API.post("/complaints", dataToSubmit);

      setSuccessMessage(response.data.message);

      setFormData({
        type: "Quota Issue",
        description: "",
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
            Lodge a Complaint
          </h1>

          {successMessage && (
            <div className="mb-4 text-green-500 text-center font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center font-semibold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#003161] font-semibold mb-2" htmlFor="type">
                Type of Complaint
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full bg-[#E6F0F1] text-[#003161] rounded-md py-2 px-3 border border-[#006A67] focus:outline-none focus:ring-1 focus:ring-[#003161] placeholder:text-[#A2B5B4]"
              >
                <option value="Quota Issue">Quota Issue</option>
                <option value="Service Issue">Service Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[#003161] font-semibold mb-2" htmlFor="description">
                Complaint Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-[#E6F0F1] text-[#003161] rounded-md py-2 px-3 border border-[#006A67] focus:outline-none focus:ring-1 focus:ring-[#003161] placeholder:text-[#A2B5B4]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#006A67] text-white py-2 rounded-md hover:bg-[#003161] focus:outline-none focus:ring-1 focus:ring-[#003161] ${loading ? "cursor-not-allowed" : ""}`}
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Complaints;
