import express from "express";
import {
  submitComplaint,
  getComplaintsForUser,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a Complaint
router.post("/complaints", authenticate, submitComplaint);

// Get Complaints for the Logged-In User
router.get("/myComplaints", authenticate, getComplaintsForUser);

// Admin: Update Complaint Status
router.patch(
  "/complaints/:id",
  authenticate,
  authorizeAdmin,
  updateComplaintStatus
);

// Delete Complaint by User
router.delete("/complaints/:id", authenticate, deleteComplaint);

export default router;
