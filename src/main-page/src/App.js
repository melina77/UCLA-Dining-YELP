import './App.css';
import React, { useState, useEffect } from 'react';
import DiningHallCard from './cards/DiningHallCard';
import Cards from './cards/Cards';

const MainPage = () => {
  // Example static data, replace with actual data fetching logic
  const [diningHalls, setDiningHalls] = useState([
    {
      id: 1,
      imageURL: '/images/img-1.jpg',
      caption: 'Delicious pizza at our Italian Night',
      username: 'ItalianDiningHall',
    },
    // Add more dining hall objects here
  ]);

  useEffect(() => {
    // Fetch the data from an API or server and set it in state
    // This example uses static data defined above
  }, []);

  return (
    <div className="main-page">
      {diningHalls.map(diningHall => (
        <DiningHallCard key={diningHall.id} diningHall={diningHall} />
      ))}
    </div>
  );
};


function HomePage() {
  return (
    <>
    <div>
      {/* <MainPage /> */}
      <Cards />
    </div>
    </>
  );
}

export default HomePage;
