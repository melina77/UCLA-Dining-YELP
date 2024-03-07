import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './header.js';
import CalorieCounter from './counter.js';
import './nav.css';

import HomePage from './main-page/src/App.js';
import LoginPage from './login-react/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page/src/App.js';


export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/calorie-counter" element={<CalorieCounter />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/comments" element={<CommentsPage />} /> 
          <Route path="/post" element={<PostPage />} /> 
        </Routes>
      </div>
    </Router>
  )
}
