import jwt from "jsonwebtoken";
import config from "../config.js";

// Middleware to authenticate the user
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET || process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to authorize admin users
export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access only" });
  }
  next();
};
