import React,{useState} from "react";
export default function TaskCard({task,onMove,onDelete,onEdit}){
 const [edit,setEdit]=useState(false),[title,setTitle]=useState(task.title),[description,setDescription]=useState(task.description||"");
 if(edit)return <article className="task"><input value={title} onChange={e=>setTitle(e.target.value)}/><textarea value={description} onChange={e=>setDescription(e.target.value)}/><button onClick={()=>{onEdit(task,{title,description});setEdit(false)}}>Save</button></article>;
 return <article className="task"><h3>{task.title}</h3><p>{task.description}</p><small>Version {task.version}</small>
 <select value={task.status} onChange={e=>onMove(task,e.target.value)}><option value="todo">To Do</option><option value="doing">Doing</option><option value="done">Done</option></select>
 <div><button className="secondary" onClick={()=>setEdit(true)}>Edit</button><button className="danger" onClick={()=>onDelete(task._id)}>Delete</button></div></article>
}
