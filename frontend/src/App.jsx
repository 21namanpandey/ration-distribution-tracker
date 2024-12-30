import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UpdateRation from "./components/UpdateRation";
import History from "./components/History";
import Login from "./components/Login";
import Register from "./components/Register";
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Complaints from "./pages/Complaints";
import MyComplaints from "./pages/MyComplaints";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} /> */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/update-ration"
        element={isAuthenticated ? <UpdateRation /> : <Navigate to="/login" />}
      />
      <Route
        path="/history"
        element={isAuthenticated ? <History /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-profile"
        element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />}
      />
      {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
      <Route
        path="/complaints"
        element={isAuthenticated ? <Complaints /> : <Navigate to="/login" />}
      />
      <Route
        path="/my-complaints"
        element={isAuthenticated ? <MyComplaints /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
