import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get("/ration/history");
        setHistory(data.history);
      } catch (error) {
        console.error(error);
        alert("Failed to load history");
      }
    };

    fetchHistory();
  }, []);

  const checkFullQuota = (record) => {
    const { riceDifference, wheatDifference, sugarDifference } = record;
    return (
      riceDifference === 0 && wheatDifference === 0 && sugarDifference === 0
    );
  };

  if (history.length === 0)
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-[#FFF4B7]">
          <div className="text-xl font-semibold text-[#003161]">
            No history available
          </div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF4B7] text-[#003161] p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center text-[#003161]">
            Ration History
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-[#006A67]">
              <thead>
                <tr className="bg-[#31807d] text-[#FFF4B7]">
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                    Date
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-32">
                    Rice Received (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-32">
                    Wheat Received (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-32">
                    Sugar Received (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                    Rice Difference (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                    Wheat Difference (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                    Sugar Difference (kg)
                  </th>
                  <th className="px-4 py-2 border border-[rgb(5,5,5)] text-center w-40">
                    Full Quota Received
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#E6F0F1]" : "bg-[#D0E8E7]"
                    }`}
                  >
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.riceGiven}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.wheatGiven}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.sugarGiven}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.riceDifference}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.wheatDifference}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {record.sugarDifference}
                    </td>
                    <td className="px-4 py-2 border border-[#006A67] text-center">
                      {checkFullQuota(record) ? (
                        <span className="text-green-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-red-600 font-bold">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
