import express from "express";
import {
    getTransactions,
    deleteTransaction,
} from "../controllers/transaction.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getTransactions);
router.delete("/:id", protect, adminOnly, deleteTransaction);

export default router;
