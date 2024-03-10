import './App.css';
import React, { useState, useEffect } from 'react';
// import DiningHallCard from './cards/DiningHallCard';
import Cards from './cards/Cards';

// function Header() {

//   return (
//     <div>
//       <header>
//         <h1 id='title'>BruinGrub</h1>
//         <nav>
//           <a class="active" href="#home">Home</a>
//           <a href="#calorie-counter">Calorie Counter</a>
//           <a href="#contact">Contact</a>
//           <a href="#logout">Logout</a>
//         </nav>
//       </header>
//     </div>
//   )
// }

// const MainPage = () => {
//   // Example static data, replace with actual data fetching logic
//   const [diningHalls, setDiningHalls] = useState([
//     {
//       id: 1,
//       imageURL: '/images/img-1.jpg',
//       caption: 'Delicious pizza at our Italian Night',
//       username: 'ItalianDiningHall',
//     },
//     // Add more dining hall objects here
//   ]);

//   useEffect(() => {
//     // Fetch the data from an API or server and set it in state
//     // This example uses static data defined above
//   }, []);

//   return (
//     <div className="main-page">
//       {diningHalls.map(diningHall => (
//         <DiningHallCard key={diningHall.id} diningHall={diningHall} />
//       ))}
//     </div>
//   );
// };


function App() {
  return (
    <>
    {/* <Header /> */}
    <div>
      {/* <MainPage /> */}
      <Cards />
    </div>
    </>
  );
}

export default App;
