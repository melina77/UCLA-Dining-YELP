// import React from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function CardItem(props) {

    // Example handleAddFoodClick implementation
    const handleAddFoodClick = () => {
        // Assuming you have a way to determine the calorie count of this item
        const caloriesFromFood = 100; // Placeholder value
        props.onAddCalories(caloriesFromFood); // onAddCalories would be a function passed as a prop from the parent component
    };
    
    // Example handleOpenCommentsClick implementation
    const handleOpenCommentsClick = () => {
        // Assuming you manage the comments visibility and possibly the current item ID in a parent component
        props.onOpenComments(true, props.itemId); 
    };
  
    return (
        <>
        <li className='cards__item'>
            <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__wrap-dining_name' data-category={props.dining_name}>
                <img
                className='cards__item__img'
                alt='Travel Image'
                src={props.src}
                />
            </figure>
            <div className='cards__item__caption'>
                <h5 className='cards__item__caption_text'>Name: {props.name}</h5>
                <h5 className='cards__item__caption_text'>Description: {props.description}</h5>
                <h5 className='cards__item__caption_text'>Calorie Count: {props.calories}</h5>
                <div className='cards__item__buttons'>
                    <button onClick={handleAddFoodClick}>Add Food to Calories</button>
                    <button onClick={handleOpenCommentsClick}>Open or Add Comments</button>
                </div>
            </div>
            </Link>
        </li>
        </>
    );
}

export default CardItem;