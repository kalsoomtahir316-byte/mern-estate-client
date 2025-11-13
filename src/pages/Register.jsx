import { register } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function Register(){
  const [form,setForm] = useState({name:"",email:"",password:""});
  const nav = useNavigate();
  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/register", {
      username: form.name,
      email: form.email,
      password: form.password,
    });

    console.log(res.data);
    alert("Registered successfully! Please login.");
    nav("/login");
  } catch (err) {
    console.log(err.response?.data || err);
    alert(
      err.response?.data?.message ||
        "Registration failed. Please check your details."
    );
  }
};
  const set=(k)=>e=>setForm({...form,[k]:e.target.value});
  return (
    <div className="container">
      <form className="card" onSubmit={submit}>
        <h2>Create account</h2>
        <input
  className="input"
  placeholder="Name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
  required
/>

<input
  className="input"
  placeholder="Email"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
  required
/>

<input
  className="input"
  placeholder="Password"
  type="password"
  value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
  required
/>
        <button className="btn">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}