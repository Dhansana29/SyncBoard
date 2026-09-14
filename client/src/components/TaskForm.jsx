import {useEffect,useState} from "react";

const empty={title:"",description:"",status:"todo"};

export default function TaskForm({task,onSave,onCancel}){
  const [form,setForm]=useState(()=>{
    const d=localStorage.getItem("syncboard_task_draft");
    return task|| (d?JSON.parse(d):empty);
  });

  useEffect(()=>{if(task)setForm(task);},[task]);
  useEffect(()=>{if(!task)localStorage.setItem("syncboard_task_draft",JSON.stringify(form));},[form,task]);

  function submit(e){
    e.preventDefault();
    onSave(form);
    localStorage.removeItem("syncboard_task_draft");
    setForm(empty);
  }

  return <form className="task-form" onSubmit={submit}>
    <h3>{task?"Edit Task":"New Task"}</h3>
    <input placeholder="Task title" required value={form.title}
      onChange={e=>setForm({...form,title:e.target.value})}/>
    <textarea placeholder="Description" value={form.description||""}
      onChange={e=>setForm({...form,description:e.target.value})}/>
    <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
      <option value="todo">To Do</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
    <div className="actions">
      <button>{task?"Save Changes":"Create Task"}</button>
      {task&&<button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
    </div>
  </form>;
}
