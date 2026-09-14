require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173" }
});

app.set("io", io);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB connected");
  server.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
})
.catch(err=>{
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});
