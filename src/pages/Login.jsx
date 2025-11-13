import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function Login(){
  const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const d=useDispatch(); const nav=useNavigate();
  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    // token save (agar backend bhejta hai)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    // redirect successful hogaya
    nav("/");
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};
  return (
    <div className="container">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn">Login</button>
        <p>New user? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}