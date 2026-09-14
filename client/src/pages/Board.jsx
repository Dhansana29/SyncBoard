import {useCallback,useEffect,useMemo,useState} from "react";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import api from "../services/api";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";

export default function Board(){
  const nav=useNavigate();
  const [tasks,setTasks]=useState([]);
  const [editing,setEditing]=useState(null);
  const [message,setMessage]=useState("");
  const user=JSON.parse(localStorage.getItem("user")||"{}");

  const logout=useCallback(()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  },[nav]);

  const load=useCallback(async()=>{
    try{
      const {data}=await api.get("/tasks");
      setTasks(data);
    }catch(err){
      if(err.response?.status===401) logout();
      else setMessage("Could not load tasks");
    }
  },[logout]);

  useEffect(()=>{
    load();
    const socket=io("http://localhost:5000");
    socket.on("tasks:changed",load);
    return ()=>socket.disconnect();
  },[load]);

  const groups=useMemo(()=>({
    todo:tasks.filter(t=>t.status==="todo"),
    doing:tasks.filter(t=>t.status==="doing"),
    done:tasks.filter(t=>t.status==="done")
  }),[tasks]);

  async function save(form){
    try{
      if(editing){
        await api.put(`/tasks/${editing._id}`,{
          title:form.title,description:form.description,status:form.status,version:editing.version
        });
        setEditing(null);
      }else{
        await api.post("/tasks",{title:form.title,description:form.description,status:form.status});
      }
      await load();
    }catch(err){
      if(err.response?.status===409){
        setMessage("Conflict detected. Latest data loaded.");
        setEditing(null); await load();
      }else setMessage(err.response?.data?.message||"Operation failed");
    }
  }

  async function move(task,status){
    try{
      await api.put(`/tasks/${task._id}`,{status,version:task.version});
      await load();
    }catch(err){
      if(err.response?.status===409){setMessage("Conflict detected.");await load();}
    }
  }

  async function del(id){
    if(!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    await load();
  }

  return <>
    <header className="topbar">
      <div><h1>SyncBoard</h1><p>Welcome, {user.name||"User"}</p></div>
      <button className="secondary" onClick={logout}>Logout</button>
    </header>
    <main className="container">
      {message&&<div className="notice">{message}</div>}
      <TaskForm task={editing} onSave={save} onCancel={()=>setEditing(null)}/>
      <div className="board">
        <Column title="To Do" tasks={groups.todo} onEdit={setEditing} onDelete={del} onMove={move}/>
        <Column title="Doing" tasks={groups.doing} onEdit={setEditing} onDelete={del} onMove={move}/>
        <Column title="Done" tasks={groups.done} onEdit={setEditing} onDelete={del} onMove={move}/>
      </div>
    </main>
  </>;
}
