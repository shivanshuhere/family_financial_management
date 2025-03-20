import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
console.log("client url : ", process.env.CLIENT_URI);

// middleware
app.use(
    cors({
        origin: process.env.CLIENT_URI,
    })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

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

// insight routes
import insightRoutes from "./routes/insight.routes.js";
app.use("/api/insights", insightRoutes);

// test routes
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

export default app;
