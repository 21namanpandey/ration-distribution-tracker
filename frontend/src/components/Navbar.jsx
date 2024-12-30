import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#003161] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-[#FFF4B7]">
            Ration Distribution Tracker App
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/dashboard" className="hover:text-[#FFF4B7]">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/update-ration" className="hover:text-[#FFF4B7]">
              Update Ration
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-[#FFF4B7]">
              History
            </Link>
          </li>
          <li>
            <Link to="/edit-profile" className="hover:text-[#FFF4B7]">
              Edit Profile
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-[#FFF4B7]">
              User List
            </Link>
          </li>
          <li>
            <Link to="/complaints" className="hover:text-[#FFF4B7]">
              Complaint
            </Link>
          </li>
          <li>
            <Link to="/my-complaints" className="hover:text-[#FFF4B7]">
              My Complaints
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

export default Navbar;
