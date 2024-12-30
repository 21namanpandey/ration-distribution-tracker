import express from "express";
import {
  submitComplaint,
  getComplaintsForUser,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a Complaint
router.post("/complaints", authenticate, submitComplaint);

// Get Complaints for a User
router.get("/complaints/:rationCardNumber", authenticate, getComplaintsForUser);

// Admin: Update Complaint Status
router.patch("/complaints/:id", authenticate, authorizeAdmin, updateComplaintStatus);

export default router;
