// import React from 'react';
import './Cards.css';
import './CardButton.css';
import CardItem from './CardItem';
import React, { useState, useEffect } from 'react';

function Cards() {

    // Example state and function in a parent component (e.g., Cards.js or App.js)

    const [totalCalories, setTotalCalories] = useState(0);

    const onAddFood = (calories) => {
        setTotalCalories(totalCalories + calories);
        console.log("clicked the add food button! that's it sorry :(");
    };
    // Pass onAddFood down to each CardItem, where it's invoked with specific calorie values

    // Example state and modal opening function in a parent component
    const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const onOpenComments = (itemId) => {
        setSelectedItemId(itemId);
        setCommentsModalOpen(true);
        console.log("clicked the comments button! that's it sorry :(");
        // 🍅🍅🍅🍅🍅: IMPLEMENT OPENING THE COMMENTS
    };
    // In your render method, conditionally render a comments modal based on isCommentsModalOpen
        
    return (
        <div className='cards'>
        <h1> ~ Check out the top Dining Hall Menu Items! ~ </h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem
                src='/images/img-9.jpg'
                text='Explore the hidden waterfall deep inside the Amazon Jungle'
                label='Adventure'
                path='/services'
                onAddFood = {onAddFood}
                onOpenComments = {onOpenComments}
                />
                {/* <CardItem
                src='/images/img-2.jpg'
                text='Travel through the Islands of Bali in a Private Cruise'
                label='Luxury'
                path='/services'
                /> */}
            </ul>
            <ul className='cards__items'>
                <CardItem
                src='/images/img-3.jpg'
                text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                label='Mystery'
                path='/services'
                />
                <CardItem
                src='/images/img-4.jpg'
                text='Experience Football on Top of the Himilayan Mountains'
                label='Adventure'
                path='/products'
                />
                <CardItem
                src='/images/img-8.jpg'
                text='Ride through the Sahara Desert on a guided camel tour'
                label='Adrenaline'
                path='/sign-up'
                />
            </ul>
            </div>
        </div>
        </div>
    );
}

export default Cards;