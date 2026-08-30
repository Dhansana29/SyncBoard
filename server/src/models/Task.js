const mongoose=require("mongoose");
module.exports=mongoose.model("Task",new mongoose.Schema({
  title:{type:String,required:true,trim:true},
  description:{type:String,default:""},
  status:{type:String,enum:["todo","doing","done"],default:"todo"},
  owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  version:{type:Number,default:0}
},{timestamps:true}));
