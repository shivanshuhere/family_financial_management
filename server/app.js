import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(
    cors({
        // origin: process.env.CLIENT_URL,
        // origin: "https://family-financial-management-1.onrender.com", // Allow requests from this origin
        origin: "*", // only temp
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
        credentials: true, // Allow cookies to be sent
        optionsSuccessStatus: 204,
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

// transaction routes
import transactionRoutes from "./routes/transactio.routes.js";
app.use("/api/transactions", transactionRoutes);

// report routes
import reportRoutes from "./routes/report.routes.js";
app.use("/api/reports", reportRoutes);

// test routes
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

export default app;
