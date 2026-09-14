import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../services/api";

export default function Login(){
  const nav=useNavigate();
  const [form,setForm]=useState({email:"",password:""});
  const [error,setError]=useState("");

  async function submit(e){
    e.preventDefault(); setError("");
    try{
      const {data}=await api.post("/auth/login",form);
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
      nav("/");
    }catch(err){setError(err.response?.data?.message||"Login failed");}
  }

  return <div className="auth-page"><form className="auth-card" onSubmit={submit}>
    <h1>SyncBoard</h1><h2>Login</h2>
    {error&&<div className="error">{error}</div>}
    <input type="email" placeholder="Email" required value={form.email}
      onChange={e=>setForm({...form,email:e.target.value})}/>
    <input type="password" placeholder="Password" required value={form.password}
      onChange={e=>setForm({...form,password:e.target.value})}/>
    <button>Login</button>
    <p>New user? <Link to="/register">Create account</Link></p>
  </form></div>;
}
