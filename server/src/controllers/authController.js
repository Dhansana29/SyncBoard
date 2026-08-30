const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const token=u=>jwt.sign({userId:u._id,name:u.name,email:u.email},process.env.JWT_SECRET,{expiresIn:"1d"});

exports.register=async(req,res)=>{
  const {name,email,password}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:"All fields required"});
  if(await User.findOne({email:email.toLowerCase()})) return res.status(409).json({message:"Email already registered"});
  const user=await User.create({name,email,password:await bcrypt.hash(password,10)});
  res.status(201).json({token:token(user),user:{id:user._id,name:user.name,email:user.email}});
};

exports.login=async(req,res)=>{
  const user=await User.findOne({email:(req.body.email||"").toLowerCase()});
  if(!user||!(await bcrypt.compare(req.body.password||"",user.password)))
    return res.status(401).json({message:"Invalid email or password"});
  res.json({token:token(user),user:{id:user._id,name:user.name,email:user.email}});
};
