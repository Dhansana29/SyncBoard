const Task = require("../models/Task");

exports.getTasks = async (req,res)=>{
  res.json(await Task.find({createdBy:req.user.id}).sort({createdAt:-1}));
};

exports.createTask = async (req,res)=>{
  try{
    const {title,description="",status="todo"}=req.body;
    if(!title) return res.status(400).json({message:"Title is required"});
    const task = await Task.create({title,description,status,createdBy:req.user.id});
    req.app.get("io")?.emit("tasks:changed");
    res.status(201).json(task);
  }catch(e){res.status(500).json({message:e.message});}
};

exports.updateTask = async (req,res)=>{
  try{
    const task = await Task.findOne({_id:req.params.id,createdBy:req.user.id});
    if(!task) return res.status(404).json({message:"Task not found"});
    const {title,description,status,version}=req.body;
    if(typeof version==="number" && version!==task.version)
      return res.status(409).json({message:"Conflict detected",currentTask:task});
    if(title!==undefined) task.title=title;
    if(description!==undefined) task.description=description;
    if(status!==undefined) task.status=status;
    task.version += 1;
    await task.save();
    req.app.get("io")?.emit("tasks:changed");
    res.json(task);
  }catch(e){res.status(500).json({message:e.message});}
};

exports.deleteTask = async (req,res)=>{
  try{
    const task = await Task.findOneAndDelete({_id:req.params.id,createdBy:req.user.id});
    if(!task) return res.status(404).json({message:"Task not found"});
    req.app.get("io")?.emit("tasks:changed");
    res.json({message:"Task deleted"});
  }catch(e){res.status(500).json({message:e.message});}
};
