import React from "react"; import TaskCard from "./TaskCard";
export default function Column({title,tasks,onMove,onDelete,onEdit}){
 return <section className="column"><h2>{title} ({tasks.length})</h2>{tasks.length===0&&<p>No tasks</p>}
 {tasks.map(t=><TaskCard key={t._id} task={t} onMove={onMove} onDelete={onDelete} onEdit={onEdit}/>)}</section>
}
