import React,{useCallback,useEffect,useState} from "react";
import {io} from "socket.io-client";
import api,{API_URL} from "../api";
import AddTask from "./AddTask"; import Column from "./Column";
export default function Board({onLogout}){
 const [tasks,setTasks]=useState([]),[msg,setMsg]=useState("");
 const load=useCallback(async()=>{try{setTasks((await api.get("/tasks")).data)}catch(e){if(e.response?.status===401)onLogout()}},[onLogout]);
 useEffect(()=>{load()},[load]);
 useEffect(()=>{const s=io(API_URL);["task:created","task:updated","task:deleted"].forEach(ev=>s.on(ev,load));return()=>s.disconnect()},[load]);
 async function create(f){try{await api.post("/tasks",f);await load();return true}catch{setMsg("Create failed");return false}}
 async function update(t,p){try{await api.put(`/tasks/${t._id}`,{...p,version:t.version});setMsg("Updated");await load()}catch(e){if(e.response?.status===409){setMsg("Conflict detected. Latest data loaded.");await load()}else setMsg("Update failed")}}
 async function del(id){await api.delete(`/tasks/${id}`);await load()}
 const by=s=>tasks.filter(t=>t.status===s);
 return <main><header><div><h1>SyncBoard</h1><p>Team Task Board</p></div><button className="secondary" onClick={onLogout}>Logout</button></header>
 <AddTask onCreate={create}/>{msg&&<p className="message">{msg}</p>}
 <div className="board"><Column title="To Do" tasks={by("todo")} onMove={(t,s)=>update(t,{status:s})} onDelete={del} onEdit={update}/>
 <Column title="Doing" tasks={by("doing")} onMove={(t,s)=>update(t,{status:s})} onDelete={del} onEdit={update}/>
 <Column title="Done" tasks={by("done")} onMove={(t,s)=>update(t,{status:s})} onDelete={del} onEdit={update}/></div></main>
}
