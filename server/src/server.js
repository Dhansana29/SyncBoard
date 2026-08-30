require("dotenv").config();
const http=require("http");
const mongoose=require("mongoose");
const {Server}=require("socket.io");
const app=require("./app");
const {setIo}=require("./socket");

async function start(){
  await mongoose.connect(process.env.MONGO_URI);
  const server=http.createServer(app);
  const io=new Server(server,{cors:{origin:process.env.CLIENT_URL||"http://localhost:3000"}});
  setIo(io);
  io.on("connection",s=>console.log("socket",s.id));
  server.listen(process.env.PORT||5000,()=>console.log("Server started"));
}
start().catch(e=>{console.error(e);process.exit(1)});
