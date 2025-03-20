import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect Middleware - Ensures user is authenticated
export const protect = async (req, res, next) => {
    let token;

    // Check for token in the request header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req?.headers?.authorization?.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded?.id).select("-password");
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Not authorized, invalid token" });
        }
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, no token provided" });
    }
};

// Admin-Only Middleware - Ensures user is an Admin
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next(); // Proceed if user is an Admin
    } else {
        res.status(403).json({ message: "Access denied. Admins only!" });
    }
};
