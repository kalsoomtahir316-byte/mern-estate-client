import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register(){
  const [form,setForm] = useState({name:"",email:"",password:""});
  const d = useDispatch(); const nav = useNavigate();
  const submit = async (e)=>{ e.preventDefault(); 
    const r = await d(register(form)); 
    if(r?.meta?.requestStatus==="fulfilled") nav("/"); };
  const set=(k)=>e=>setForm({...form,[k]:e.target.value});
  return (
    <div className="container">
      <form className="card" onSubmit={submit}>
        <h2>Create account</h2>
        <input className="input" placeholder="Name" value={form.name} onChange={set("name")} required/>
        <input className="input" placeholder="Email" value={form.email} onChange={set("email")} required/>
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={set("password")} required/>
        <button className="btn">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}