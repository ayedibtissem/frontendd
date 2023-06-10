import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Logo from "./Photo1";

const Navbar = () => {
  const [nav, setNav] = useState(false); 
  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <div>
         <Logo></Logo>
          </div>
        </a>
       
        <ul className={nav ? "nav-links-nav" : "nav-links"} onClick={() => setNav(false)}>
          <Link to="/challenge" className="home">
            <li>Home</li>
          </Link>
          <Link to="/about" className="about">
            <li>About</li>
          </Link>
          <Link to="/services" className="services">
            <li>Services</li>
          </Link>
          <Link to="/login" className="skills">
            <li>signin</li>
          </Link>
          <Link to="/register" className="contact"> 
            <li>signup</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
