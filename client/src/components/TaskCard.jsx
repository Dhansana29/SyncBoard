export default function TaskCard({task,onEdit,onDelete,onMove}){
  return <div className="task-card">
    <h3>{task.title}</h3>
    {task.description&&<p>{task.description}</p>}
    <div className="actions">
      {task.status!=="todo"&&<button className="secondary" onClick={()=>onMove(task,task.status==="done"?"doing":"todo")}>←</button>}
      <button className="secondary" onClick={()=>onEdit(task)}>Edit</button>
      <button className="danger" onClick={()=>onDelete(task._id)}>Delete</button>
      {task.status!=="done"&&<button className="secondary" onClick={()=>onMove(task,task.status==="todo"?"doing":"done")}>→</button>}
    </div>
  </div>;
}
