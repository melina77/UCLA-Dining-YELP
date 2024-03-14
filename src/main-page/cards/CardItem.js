import React, { useState, useEffect } from 'react';
import LikeButton from '../likes/LikeButton';
import { Link } from 'react-router-dom';

// defines each individual food card post
function CardItem(props) {
    // called the onAddCalories function passed through Cards.js
    const handleAddFoodClick = () => {
        props.onAddCalories();
    };
    
    return (
        <>
        <li className='cards__item'>
            <div className='cards__item__link'>
            <figure className='cards__item__wrap-dining_name' data-category={props.dining_name}>
                {/* post image */}
                <img
                className='cards__item__img'
                src={`http://localhost:8080/images/${props.src}`}
                />
            </figure>
            <div className='cards__item__caption'>
                {/* card caption */}
                <h5 className='cards__item__caption_text'>Name: {props.name}</h5>
                <h5 className='cards__item__caption_text'>Description: {props.description}</h5>
                <h5 className='cards__item__caption_text'>Calorie Count: {props.calories}</h5>
                {/* post buttons */}
                <div className='cards__item__buttons'>
                    <button onClick={handleAddFoodClick}>Add Food to Calories</button>
                    <Link to={`/posts/${props.food_id}/comments`}>
                        <button>💬</button>
                    </Link>
                    <LikeButton postId={props.food_id} initialLikes={props.likes_array} />
                </div>
            </div>
            </div>
        </li>
        </>
    );
}

export default CardItem;