import React, { useState, useEffect } from "react";
import API from "../api";
import Navbar from "./Navbar";
import { AlertCircle, CheckCircle } from "react-feather";

const UpdateRation = () => {
  const [rationData, setRationData] = useState({ rice: 0, wheat: 0, sugar: 0 });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [mismatch, setMismatch] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to be logged in to fetch the data.");
        return;
      }

      const { data } = await API.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(data);
    } catch (err) {
      setError("Failed to fetch user data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rationData.rice < 0 || rationData.wheat < 0 || rationData.sugar < 0) {
      setError("Please enter valid positive values for all fields.");
      setSuccess(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to update the ration.");
      setSuccess(false);
      return;
    }

    try {
      const rationCardNumber = localStorage.getItem("rationCardNumber");

      const { data } = await API.put(
        "/ration/update",
        {
          rationCardNumber,
          rice: rationData.rice,
          wheat: rationData.wheat,
          sugar: rationData.sugar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { rice, wheat, sugar, quota } = data;
      const receiptData = {
        transactionId:
          "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        details: { rice, wheat, sugar },
      };

      setReceipt(receiptData);
      setRationData({ rice: 0, wheat: 0, sugar: 0 });
      setError(null);
      setSuccess(true);

      const mismatches = Object.entries(rationData).filter(
        ([item, amount]) => amount < quota[item]
      );
      if (mismatches.length > 0) {
        setMismatch(
          `You received less than your quota for: ${mismatches
            .map(([item]) => item)
            .join(", ")}`
        );
      } else {
        setMismatch(null);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update ration. Please try again later.";

      setError(errorMessage);
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRationData({ ...rationData, [name]: parseInt(value) || 0 });
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
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#FFF4B7] pt-16 pb-8 overflow-auto">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold text-[#003161] mb-6 text-center">
            Update Ration
          </h1>

          {error && (
            <div className="text-[#003161] text-center mb-4">
              <AlertCircle className="inline h-5 w-5 mr-1" />
              {error}
            </div>
          )}

          {success && (
            <div className="text-[#006A67] text-center mb-4">
              <CheckCircle className="inline h-5 w-5 mr-1" />
              Ration updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {["rice", "wheat", "sugar"].map((item) => (
              <div className="mb-4" key={item}>
                <label
                  htmlFor={item}
                  className="block text-[#003161] font-medium mb-2"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)} (kg) - Quota:{" "}
                  {userData.quota[item]} kg
                </label>
                <input
                  type="number"
                  name={item}
                  id={item}
                  value={rationData[item]}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#E6F0F1] text-[#003161] border border-[#006A67] rounded-md focus:outline-none focus:ring-1 focus:ring-[#003161]"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 bg-[#006A67] text-white font-semibold rounded-md hover:bg-[#003161] focus:outline-none focus:ring-1 focus:ring-[#003161]"
            >
              Update Ration
            </button>
          </form>

          {mismatch && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <div className="flex">
                <AlertCircle className="h-6 w-6 mr-2" />
                <p>{mismatch}</p>
              </div>
            </div>
          )}

          {receipt && (
            <div className="mt-8 w-full max-w-md p-6 bg-white border rounded shadow">
              <h3 className="text-xl font-bold mb-4">Digital Receipt</h3>
              <p>Transaction ID: {receipt.transactionId}</p>
              <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
              <h4 className="font-bold mt-4 mb-2">Received Ration:</h4>
              <ul>
                {Object.entries(receipt.details).map(([item, amount]) => (
                  <li key={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}: {amount} kg
                  </li>
                ))}
              </ul>
              {!mismatch && (
                <div className="mt-4 flex items-center text-[#006A67]">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <p>Received full quota</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateRation;
