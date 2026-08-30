import React,{useEffect,useState} from "react";
const blank={title:"",description:"",status:"todo"};
export default function AddTask({onCreate}){
 const [f,setF]=useState(()=>{try{return JSON.parse(localStorage.getItem("taskDraft"))||blank}catch{return blank}});
 useEffect(()=>localStorage.setItem("taskDraft",JSON.stringify(f)),[f]);
 async function submit(e){e.preventDefault();if(!f.title.trim())return;if(await onCreate(f)){setF(blank);localStorage.removeItem("taskDraft")}}
 return <form className="add" onSubmit={submit}>
 <input aria-label="Task title" placeholder="Task title" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
 <input placeholder="Description" value={f.description} onChange={e=>setF({...f,description:e.target.value})}/>
 <select value={f.status} onChange={e=>setF({...f,status:e.target.value})}><option value="todo">To Do</option><option value="doing">Doing</option><option value="done">Done</option></select>
 <button>+ Add Task</button></form>
}
