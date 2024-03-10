import React, { useState } from "react";
import { Link, useHistory, Navigate } from "react-router-dom";
import './header.css';
import './nav.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm and setSearchTerm states
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Navigate('/');
  }

  const handleSearchClick = () => {
    // Navigate to the search page with the search term as a query parameter
    history.push(`/search?term=${searchTerm}`);
  }

  // const toggleSearch = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // }


  return (
    <div className='header-container'>
      <header>
        <div className="logo-container">
          <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
        </div>
        {/* <Link to="/search" className="search-bar">  */}
          <input
            type="text"
            placeholder="Search cards"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <button onClick={handleSearchClick} className="nav-link">Search</button>
        {/* </Link> */}
        <nav>
          {/* <button onClick={handleLogout}>Remove Token</button> */}
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/post" className="nav-link">Post</Link>
          <Link to="/calorie-counter" className="nav-link">Calorie Counter</Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
      </header>
      {/* <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> Pass searchTerm and setSearchTerm as props */}
    </div>
  );
}

export default Header;
