import express from "express";
import { getFinancialReport } from "../controllers/report.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getFinancialReport);

export default router;
