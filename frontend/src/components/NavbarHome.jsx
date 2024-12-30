import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#003161] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-[#FFF4B7]">
            Ration Distribution Tracker
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
