import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './global-header/header.js';
import CalorieCounter from './counter-page/counter.js';
import HomePage from './main-page/src/App.js';
import LoginPage from './login-react/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page/src/App.js';


function PageRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';
  console.log(location)

  return (
    <div>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calorie-counter" element={<CalorieCounter />} />
        <Route path="/login" element={<LoginPage />} />
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