import express from "express";
import { generateInsights } from "../controllers/insight.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/generate", protect, generateInsights);

export default router;
