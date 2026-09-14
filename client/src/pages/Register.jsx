import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../services/api";

export default function Register(){
  const nav=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [error,setError]=useState("");

  async function submit(e){
    e.preventDefault(); setError("");
    try{
      const {data}=await api.post("/auth/register",form);
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
      nav("/");
    }catch(err){setError(err.response?.data?.message||"Registration failed");}
  }

  return <div className="auth-page"><form className="auth-card" onSubmit={submit}>
    <h1>SyncBoard</h1><h2>Register</h2>
    {error&&<div className="error">{error}</div>}
    <input placeholder="Name" required value={form.name}
      onChange={e=>setForm({...form,name:e.target.value})}/>
    <input type="email" placeholder="Email" required value={form.email}
      onChange={e=>setForm({...form,email:e.target.value})}/>
    <input type="password" placeholder="Password" minLength="6" required value={form.password}
      onChange={e=>setForm({...form,password:e.target.value})}/>
    <button>Create Account</button>
    <p>Already registered? <Link to="/login">Login</Link></p>
  </form></div>;
}
