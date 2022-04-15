import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import logo from './../../Images/athenalogo.png'




const Navbar = () => {
  
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
 



  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/">
            <img src={logo} className ='logo' />
          </Link>
        </li>
        <li className="navlinks"> 
          <Link to='/student/search' className="tutor_search_button navlink">Tutors</Link>
        </li>
        <li className="login_logout_button">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
