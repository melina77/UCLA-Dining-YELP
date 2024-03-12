import React, { useState, useEffect } from 'react'; 
//import axios from 'axios';
//import { Link } from 'react-router-dom'
import './nav.css';
import Search from './search/App.js';

function Header() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
          .then(res => res.json())
          .then(data => {
              setUsers(data.map(user => ({
                  name: user.name,
                  email: user.email,
                  id: user.id
              })));
          })
          .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
  };

  const handleLogout = () => {
    console.log('logged out')
  }

  return (
    <div className='header-container'>
      <header>
        <div className="logo-container">
          <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
        </div>
        <input type="text" placeholder="Search users" onChange={handleSearch} />
        <nav>
          <a to="/" className="nav-link">Home</a>
          <a to="/calorie-counter" className="nav-link">Calorie Counter</a>
          <a to="/contact" className="nav-link">Contact</a>
          <button id='logout-button' onClick={handleLogout}>Logout</button>   
        </nav>
      </header>
      <div>
          {users.map(user => (
            <div key={user.id} className={user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm) ? '' : 'hide'}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
 </div>
  )
}

import Header from './global-header/header.js';
import CalorieCounter from './counter-page/counter.js';
import HomePage from './main-page/src/App.js';
import LoginPage from './login-react/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page-new/src/App.js';
import SearchPage from './search-page/src/App.js';

  // State to manage input value
  const [inputValue, setInputValue] = useState('');
  // State to manage add food button
  const [isEditing, setisEditing] = useState(false);

  const navigate = useNavigate();

  const checkAuthToken = () => {
    const token = localStorage.getItem('authToken'); 
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
    }
    console.log(decodedToken);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is present
    if (!token && location.pathname !== '/') { // Only redirect if not already on login page
      navigate('/');
    }

    // Check if token is expired 
    // else if (decodedToken.exp < currentTime && location.pathname !== '/') {
    //   // Remove token and navigate back to login page
    //   localStorage.removeItem('authToken');
    //   Navigate('/');
    // }
  };

  useEffect(() => {
    checkAuthToken(); // Check authentication token on initial render
  }, []);

  useEffect(() => {
    checkAuthToken(); 
  }, [location]); // Check authentication token whenever location changes (Clicking on nav)

  return (
    <div>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<CommentsPage />} />
        <Route path="/calorie-counter" element={<CalorieCounter />} />
        <Route path="/comments" element={<CommentsPage />} /> 
        <Route path="/post" element={<PostPage />} /> 
      </Routes>
    </div>
  );


export default function App() {

  return (
      <body>
        <Header />
        {/* <Search /> */}
        {/* <CalorieCounter /> */}
      </body>
  )
}
