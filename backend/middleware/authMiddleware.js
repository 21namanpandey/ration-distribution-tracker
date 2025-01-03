
import jwt from "jsonwebtoken";
import config from "../config.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

// Middleware to authenticate the user
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET || process.env.JWT_SECRET
    );

    const admin = await Admin.findById(decoded.id).select("-password");
    const user = await User.findById(decoded.id).select("-password");

    if (admin) {
      req.user = { ...decoded, role: "admin", admin };
    } else if (user) {
      req.user = { ...decoded, role: "user", user };
    } else {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access only" });
  }
  next();
};

export const authorizeUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ error: "Forbidden: User access only" });
  }
  next();
};
