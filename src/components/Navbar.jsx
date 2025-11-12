import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(){
  const go = useNavigate();
  return (
   <header className="bg-[#0F172A] text-white">
      <div className="nav__inner">
        <button className="brand" onClick={()=>go("/")}>
          <span className="brand__logo"></span>
          <span className="brand__name">EstateVerse</span>
        </button>

        <nav className="menu">
          <NavLink to="/" end className={({isActive})=>isActive?"link link--active":"link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?"link link--active":"link"}>About</NavLink>
          <NavLink to="/listings" className={({isActive})=>isActive?"link link--active":"link"}>Listings</NavLink>
          <a href="/login" className="btn btn--ghost">Sign in</a>
        </nav>
      </div>
    </header>
  );
}