import React from 'react';
import './DiningHallCard.css';

const DiningHallCard = ({ diningHall }) => {
  return (
    <div className="card">
      <img src={diningHall.imageURL} alt={diningHall.caption} />
      <div className="card-body">
        <h5 className="card-title">{diningHall.username}</h5>
        <p className="card-text">{diningHall.caption}</p>
        <button className="btn btn-primary">Add Comment</button>
        <button className="btn btn-secondary">Add Food</button>
      </div>
    </div>
  );
};

export default DiningHallCard;
