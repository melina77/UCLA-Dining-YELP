import { useEffect, useState, Navigate } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from './global-header/header.js';
import CalorieCounter from './counter-page/counter.js';
import HomePage from './main-page/src/App.js';
import CommentsPage from './comments-page/src/App.js';
import PostPage from './post-page/src/App.js';
import SearchPage from './search-page/src/App.js';

function PageRoutes({handleSearch}) {
  const location = useLocation();
  const hideHeader = location.pathname === '/';
  const navigate = useNavigate();

  const checkAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token && location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    checkAuthToken();
  }, [location]);

  return (
    <div>
      <Header handleSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} />} /> {/* Pass handleSearch as a prop */}
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Router>
      <PageRoutes handleSearch={handleSearch}/>
    </Router>
  );
}
