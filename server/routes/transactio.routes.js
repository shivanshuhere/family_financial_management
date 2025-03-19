import express from "express";
import {
    addTransaction,
    getTransactions,
    deleteTransaction,
} from "../controllers/transaction.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Transaction Routes
router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);

export default router;
