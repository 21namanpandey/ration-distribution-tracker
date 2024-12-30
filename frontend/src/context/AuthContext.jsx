import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Ensure you have an API module for making requests

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const { data } = await API.post("/login", formData);
      setAuthData({
        token: data.token,
        user: data.user,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const logout = () => {
    setAuthData({
      token: "",
      user: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (authData.token) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [authData.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ authData, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
