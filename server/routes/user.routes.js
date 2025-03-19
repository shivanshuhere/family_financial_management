import express from "express";
import {
    getAllUsers,
    updateUserRole,
    deleteUser,
} from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.put("/:id", protect, adminOnly, updateUserRole);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
