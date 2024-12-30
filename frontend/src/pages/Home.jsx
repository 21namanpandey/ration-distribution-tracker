import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-[#FFF4B7] flex flex-col justify-center items-center text-center py-10">
        <h1 className="text-4xl font-bold text-[#003161] mb-6">
          Welcome to Ration Distribution Tracker
        </h1>
        <p className="text-xl text-[#003161] mb-6">
          Ensuring transparency in the Public Distribution System
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-[#003161] text-white py-2 px-6 rounded-lg hover:bg-[#006A67]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#006A67] text-white py-2 px-6 rounded-lg hover:bg-[#003161]"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
