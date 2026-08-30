const Task=require("../models/Task");
const {getIo}=require("../socket");

exports.list=async(req,res)=>res.json(await Task.find({owner:req.user.userId}).sort({createdAt:-1}));

exports.create=async(req,res)=>{
  if(!req.body.title) return res.status(400).json({message:"Title required"});
  const task=await Task.create({...req.body,owner:req.user.userId});
  if(getIo()) getIo().emit("task:created",task);
  res.status(201).json(task);
};

exports.update=async(req,res)=>{
  const task=await Task.findOne({_id:req.params.id,owner:req.user.userId});
  if(!task) return res.status(404).json({message:"Task not found"});
  if(typeof req.body.version!=="number"||task.version!==req.body.version)
    return res.status(409).json({message:"Conflict detected",latest:task});
  ["title","description","status"].forEach(k=>{if(req.body[k]!==undefined) task[k]=req.body[k]});
  task.version+=1;
  await task.save();
  if(getIo()) getIo().emit("task:updated",task);
  res.json(task);
};

exports.remove=async(req,res)=>{
  const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user.userId});
  if(!task) return res.status(404).json({message:"Task not found"});
  if(getIo()) getIo().emit("task:deleted",{_id:task._id});
  res.json({message:"Deleted"});
};
