import React,{useState} from "react"; import api from "../api";
export default function Login({onAuth,switchMode}){
 const [f,setF]=useState({email:"",password:""}),[err,setErr]=useState("");
 async function submit(e){e.preventDefault();try{const r=await api.post("/auth/login",f);onAuth(r.data.token)}catch(x){setErr(x.response?.data?.message||"Login failed")}}
 return <form className="card" onSubmit={submit}><h2>Login</h2>{err&&<p className="error">{err}</p>}
 <input placeholder="Email" type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
 <input placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
 <button>Login</button><button type="button" className="secondary" onClick={switchMode}>Create account</button></form>
}
