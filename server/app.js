import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();


// middleware
app.use(cors({
    origin : "http://127.0.0.1:5173"
}))

app.use(json());
app.use(urlencoded());
app.use(cookieParser());
dotenv.config({
    path : "./.env"
})

// user routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/auth", userRoutes);

// test routes
app.get("/",(req, res)=>{
    res.send("<h1>Home page</h1>")
})

app.get("/test",(req, res)=>{
    res.send("<h1>test page</h1>")
})

export default app;