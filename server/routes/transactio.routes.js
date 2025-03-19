import express from "express";
import {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
} from "../controllers/transaction.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new transaction (All authenticated users)
router.post("/", protect, createTransaction);

// Get transactions - Admin sees all, users see their own
router.get("/", protect, getTransactions);

// Update a transaction (Only Admin)
router.put("/:id", protect, adminOnly, updateTransaction);

// Delete a transaction (Only Admin)
router.delete("/:id", protect, adminOnly, deleteTransaction);

export default router;
