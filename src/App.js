import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './global-header/header.js';
import CalorieCounter from './counter-page/counter.js';
import HomePage from './main-page/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page/src/App.js';
import SearchPage from './search-page/src/App.js';

function PageRoutes({ searchTerm, setSearchTerm }) {
  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem('authToken');
      if (!token && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    };

    checkAuthToken();
  }, []);

  return (
    <Router> {/* Wrap content with Router component */}
      <div>
        <Header setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/calorie-counter" element={<CalorieCounter />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default PageRoutes;
