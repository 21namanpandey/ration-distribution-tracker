import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-[#003161] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard" className="hover:text-[#FFF4B7]">
            Admin Dashboard
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/admin/complaints" className="hover:text-[#FFF4B7]">
              Complaints
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-[#FFF4B7]">
              Users
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-[#F44336] hover:bg-[#FF9800] text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
