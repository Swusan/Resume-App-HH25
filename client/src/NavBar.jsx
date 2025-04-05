import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-title">
        <h4>Resume Tools</h4>
      </div>
      <ul className="nav-links">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/tools">Tools</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
