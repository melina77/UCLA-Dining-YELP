// import React from 'react';
import './Cards.css';
import './CardButton.css';
import CardItem from './CardItem';
import React, { useState, useEffect } from 'react';
import logo1 from '../../public/images/img-9.jpg';
import logo2 from '../../public/images/img-3.jpg'

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
                src={logo1}
                name='Juicy Chicken'
                description='Pretend this is scrumptious bplate chicken. Bro its literally 6AM, bplate literally opens in an hour.'
                calories='too many'
                dining_name='B-Plate'
                path='/services'
                onAddFood = {onAddFood}
                onOpenComments = {onOpenComments}
                />
                {/* <CardItem
                src='/images/img-2.jpg'
                text='Travel through the Islands of Bali in a Private Cruise'
                dining_name='Luxury'
                path='/services'
                /> */}
            </ul>
            <ul className='cards__items'>
                <CardItem
                src={logo2}
                description='Lets pretend you see asian food here.'
                dining_name='Feast'
                path='/services'
                />
                <CardItem
                src='/images/img-4.jpg'
                description='Does anyone still eat here?'
                dining_name='De Neve'
                path='/products'
                />
                <CardItem
                src='/images/img-8.jpg'
                description='BEST dining hall for real.'
                dining_name='The Study'
                path='/sign-up'
                />
            </ul>
            </div>
        </div>
        </div>
    );
}

export default Cards;