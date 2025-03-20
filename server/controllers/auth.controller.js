import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user._id);
            res.status(200).json({ token, role: user?.role, name: user?.name });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
