import React,{useState} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
export default function App(){
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [mode,setMode]=useState("login");
  const auth=t=>{localStorage.setItem("token",t);setToken(t)};
  const logout=()=>{localStorage.removeItem("token");setToken(null)};
  if(token) return <Board onLogout={logout}/>;
  return <main className="auth-page"><h1>SyncBoard</h1>{mode==="login"?
    <Login onAuth={auth} switchMode={()=>setMode("register")}/>:
    <Register onAuth={auth} switchMode={()=>setMode("login")}/>}</main>;
}
