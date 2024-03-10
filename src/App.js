import { useEffect, useState, Navigate } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


import Header from './global-header/header.js';
import CalorieCounter from './counter-page/counter.js';
import HomePage from './main-page/src/App.js';
import LoginPage from './login-react/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page-new/src/App.js';
import SearchPage from './search-page/src/App.js';


function PageRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

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
        <Route path="/home" element={<HomePage />} />
        <Route path="/calorie-counter" element={<CalorieCounter />} />
        <Route path="/comments" element={<CommentsPage />} /> 
        <Route path="/post" element={<PostPage />} /> 
      </Routes>
    </div>
  );
}

export default function App() {

  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}