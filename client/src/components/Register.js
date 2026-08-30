import React,{useState} from "react"; import api from "../api";
export default function Register({onAuth,switchMode}){
 const [f,setF]=useState({name:"",email:"",password:""}),[err,setErr]=useState("");
 async function submit(e){e.preventDefault();try{const r=await api.post("/auth/register",f);onAuth(r.data.token)}catch(x){setErr(x.response?.data?.message||"Register failed")}}
 return <form className="card" onSubmit={submit}><h2>Register</h2>{err&&<p className="error">{err}</p>}
 <input placeholder="Name" value={f.name} onChange={e=>setF({...f,name:e.target.value})} required/>
 <input placeholder="Email" type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
 <input placeholder="Password" type="password" minLength="6" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
 <button>Register</button><button type="button" className="secondary" onClick={switchMode}>Back to login</button></form>
}
