import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF4B7] p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#040410] mb-4">
            Welcome, Admin
          </h1>
          <p className="text-[#163758] text-lg">
            Manage your application effectively with the tools below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            to="/admin/complaints"
            className="flex flex-col items-center justify-center bg-[#31807d] text-white p-6 rounded-lg shadow-lg hover:bg-[#25665b] transition"
          >
            <span className="text-2xl font-semibold mb-2">📋</span>
            <span className="text-lg font-medium">View Complaints</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col items-center justify-center bg-[#31807d] text-white p-6 rounded-lg shadow-lg hover:bg-[#25665b] transition"
          >
            <span className="text-2xl font-semibold mb-2">👥</span>
            <span className="text-lg font-medium">View Users</span>
          </Link>
          <Link
            to="/admin/reports"
            className="flex flex-col items-center justify-center bg-[#31807d] text-white p-6 rounded-lg shadow-lg hover:bg-[#25665b] transition"
          >
            <span className="text-2xl font-semibold mb-2">📊</span>
            <span className="text-lg font-medium">Generate Reports</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex flex-col items-center justify-center bg-[#31807d] text-white p-6 rounded-lg shadow-lg hover:bg-[#25665b] transition"
          >
            <span className="text-2xl font-semibold mb-2">⚙️</span>
            <span className="text-lg font-medium">Settings</span>
          </Link>
          <Link
            to="/admin/help"
            className="flex flex-col items-center justify-center bg-[#31807d] text-white p-6 rounded-lg shadow-lg hover:bg-[#25665b] transition"
          >
            <span className="text-2xl font-semibold mb-2">❓</span>
            <span className="text-lg font-medium">Help & Support</span>
          </Link>
        </div>

        <div className="mt-56 text-center">
          <p className="text-[#0a0a0a] text-lg font-semibold">
            Need assistance? Visit our{" "}
            <Link to="/admin/help" className="text-[#25665b] hover:underline">
              Help & Support
            </Link>{" "}
            section or contact us directly.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
