const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title:{type:String,required:true,trim:true},
  description:{type:String,default:""},
  status:{type:String,enum:["todo","doing","done"],default:"todo"},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  version:{type:Number,default:0}
},{timestamps:true});

module.exports = mongoose.model("Task", taskSchema);
