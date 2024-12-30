import express from "express";
import { updateRation, getRationHistory } from "../controllers/rationController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/ration/update", authenticate, updateRation);
router.get("/ration/history", authenticate, getRationHistory);

export default router;
