import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF4B7] py-20 flex flex-col">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#003161]">
          Welcome to Ration Distribution Tracker
        </h1>
        <p className="text-xl text-[#003161] mt-4">
          Ensuring transparency in the Public Distribution System
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row justify-evenly items-center lg:items-start px-6 lg:px-20 space-y-10 lg:space-y-0 mt-10">
        {/* User Portal */}
        <div className="bg-white w-full lg:w-1/3 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#003161] mb-4 text-center ">
            User Portal
          </h2>
          <p className="text-lg text-[#006A67] mb-6 text-center ">
            Access your ration details and track distributions easily.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="bg-[#003161] text-white py-2 px-6 rounded-lg text-center hover:bg-[#006A67] transition-all duration-300"
            >
              User Login
            </Link>
            <Link
              to="/register"
              className="bg-[#006A67] text-white py-2 px-6 rounded-lg text-center hover:bg-[#003161] transition-all duration-300"
            >
              User Register
            </Link>
          </div>
        </div>

        {/* Admin Portal */}
        <div className="bg-white w-full lg:w-1/3 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#003161] mb-4 text-center ">
            Admin Portal
          </h2>
          <p className="text-lg text-[#006A67] mb-6 text-center ">
            Manage complaints and oversee the distribution process.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              to="/admin/login"
              className="bg-[#003161] text-white py-2 px-6 rounded-lg text-center hover:bg-[#006A67] transition-all duration-300"
            >
              Admin Login
            </Link>
            <Link
              to="/admin/register"
              className="bg-[#006A67] text-white py-2 px-6 rounded-lg text-center hover:bg-[#003161] transition-all duration-300"
            >
              Admin Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
