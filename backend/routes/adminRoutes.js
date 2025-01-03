import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllComplaints,
  getAllUsers,
  updateComplaint,
  getUserDetails,
  deleteComplaint, 
} from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Authentication
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Admin Dashboard Actions
router.get("/complaints", authenticate, authorizeAdmin, getAllComplaints);
router.get("/users", authenticate, authorizeAdmin, getAllUsers);
router.get("/user/:userId", authenticate, authorizeAdmin, getUserDetails);
router.patch("/complaints/:id", authenticate, authorizeAdmin, updateComplaint);
router.delete("/complaints/:id", authenticate, authorizeAdmin, deleteComplaint);


export default router;
