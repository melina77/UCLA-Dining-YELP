import { Navigate } from 'react-router-dom';
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Search from '../search-page/Search.js';


function Header({ handleSearch, searchTerm, setSearchTerm }) {
  // Remove token and navigate when logging out
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Navigate('/'); // Use navigate to redirect to '/'
  }

  return (
    <div className='header-container'>
      <header>
        <div className="logo-container">
          {/* Logo links to home page */}
          <Link to='/home'>
            <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <nav>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/calorie-counter" className="nav-link">Calorie Counter</Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;

