import express from "express";
import { getAllUsers, getUserDetails, updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user", authenticate, getUserDetails);
router.get("/users", authenticate, getAllUsers);
router.put("/user/update", authenticate, updateProfile);

export default router;
