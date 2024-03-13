import { Link, Navigate, useLocation } from "react-router-dom";
import './header.css';
import './nav.css';

function Header_Dining() {
  // Remove token and navigate to login page when logged out
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Navigate('/');
  }

  return (
    <div className='header-container'>
      <header>
        <div className="logo-container">
          {/* Logo links to homepage */}
          <Link to='/home'>
            <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <nav>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/posts" className="nav-link">Post</Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
      </header>
    </div>
  )
}

  export default Header_Dining;