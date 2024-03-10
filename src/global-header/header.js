import { Navigate } from 'react-router-dom';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from '../search-page/src/Search.js';


function Header({ handleSearch, searchTerm, setSearchTerm }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Navigate('/'); // Use navigate to redirect to '/'
  }

  return (
    <div className='header-container'>
      <header>
        <div className="logo-container">
          <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
        </div>
        {/* Conditionally render search component based on state */}
        {isSearchOpen ? (
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
        ) : (
          <input
            type="text"
            placeholder="Search cards"
            onClick={toggleSearch} // Open search on click
          />
        )}
        <nav>
          {/* <button onClick={handleLogout}>Remove Token</button> */}
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/post" className="nav-link">Post</Link>
          <Link to="/calorie-counter" className="nav-link">Calorie Counter</Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;

