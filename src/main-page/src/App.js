import './App.css';
import React, { useState, useEffect } from 'react';
import Cards from './cards/Cards';


function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />  
      <Cards />
    </div>
    </>
  );
}

export default App;
