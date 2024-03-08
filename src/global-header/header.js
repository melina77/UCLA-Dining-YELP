import { Link, useLocation } from "react-router-dom";
import './header.css';
import './nav.css';

function Header() {
    const handleLogout = () => {
      console.log('logged out')
    }

    return (
      <div className='header-container'>
        <header>
          <div className="logo-container">
            <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
          </div>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/post" className="nav-link">Post</Link>
            <Link to="/calorie-counter" className="nav-link">Calorie Counter</Link>
            <Link to="/login" className="nav-link" onClick={handleLogout}>Logout</Link>
          </nav>
        </header>
      </div>
    )
  }

  export default Header;