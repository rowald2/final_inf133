import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    /*<nav className='navbar'>
      <div className='navbar-left'>
        <a href='#' className='logo'>
          AntEats
        </a>
      </div>
      <div className='navbar-right'>
        <ul className='nav-links'>
          <li>
            <a href='#LandingPage'>Places</a>
          </li>
          <li>
            <a href='#'>Reviews</a>
          </li>
          <li>
            <a href='#NutritionPage'>Nutrition</a>
          </li>
        </ul>
      </div>
    </nav>*/
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">AntEats</h2>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="links" to="/NutritionPage">
              Nutrition
            </Link>
          </li>
          <li>
            <Link className="links" to="/TimePage">
              Time
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
