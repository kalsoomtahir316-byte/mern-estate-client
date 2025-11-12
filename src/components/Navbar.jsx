import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";



export default function Navbar() {
  return (
    <header className="ev-navbar-fixed">
      <div className="ev-nav-wrap">
        <NavLink to="/" className="ev-brand">EstateVerse</NavLink>

        <nav className="ev-links">
          <NavLink to="/" end className={({isActive}) => isActive ? "ev-active" : ""}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "ev-active" : ""}>About</NavLink>
          <NavLink to="/listings" className={({isActive}) => isActive ? "ev-active" : ""}>Listings</NavLink>
        </nav>

        <NavLink to="/login" className="ev-signin">Sign in</NavLink>
      </div>
    </header>
  );
}