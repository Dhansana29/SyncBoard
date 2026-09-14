import TaskCard from "./TaskCard";

export default function Column({title,tasks,onEdit,onDelete,onMove}){
  return <section className="column">
    <h2>{title} <span>{tasks.length}</span></h2>
    {tasks.length===0&&<p className="empty">No tasks</p>}
    {tasks.map(t=><TaskCard key={t._id} task={t} onEdit={onEdit} onDelete={onDelete} onMove={onMove}/>)}
  </section>;
}
