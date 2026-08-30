const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:3000"}));
app.use(express.json());
app.get("/",(req,res)=>res.json({message:"SyncBoard API running"}));
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));
module.exports=app;
