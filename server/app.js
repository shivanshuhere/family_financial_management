import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(
    cors({
        // origin: process.env.CLIENT_URI,
        origin: "http://localhost:5173", // Allow requests from this origin
        // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
        // credentials: true, // Allow cookies to be sent
        // optionsSuccessStatus: 204,
    })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({
    path: "./.env",
});

// auth routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// user routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);

// test routes
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

export default app;
