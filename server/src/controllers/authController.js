const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sign = user => jwt.sign(
  {id:user._id,email:user.email},
  process.env.JWT_SECRET,
  {expiresIn:"7d"}
);

exports.register = async (req,res)=>{
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({message:"All fields are required"});
    if(await User.findOne({email:email.toLowerCase()})) return res.status(409).json({message:"Email already registered"});
    const user = await User.create({
      name,email:email.toLowerCase(),password:await bcrypt.hash(password,10)
    });
    res.status(201).json({token:sign(user),user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){res.status(500).json({message:e.message});}
};

exports.login = async (req,res)=>{
  try{
    const {email,password}=req.body;
    const user = await User.findOne({email:(email||"").toLowerCase()});
    if(!user || !(await bcrypt.compare(password||"",user.password)))
      return res.status(401).json({message:"Invalid email or password"});
    res.json({token:sign(user),user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){res.status(500).json({message:e.message});}
};
