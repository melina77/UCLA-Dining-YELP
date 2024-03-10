import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PageRoutes from '../../App.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <PageRoutes searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Got rid of <PageRoutes cards={searchTerm} might need this */}
    </Router>
  );
}

export default App;
