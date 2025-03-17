import express from "express"


const app = express();

app.get("/",(req, res)=>{

    res.send("<h1>Home page</h1>")
})

app.get("/test",(req, res)=>{

    res.send("<h1>test page</h1>")
})

export default app;