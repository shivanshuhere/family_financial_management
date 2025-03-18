import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
    })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({
    path: "./.env",
});

// user routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// test routes
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

export default app;
