import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';

function Cards({ searchTerm, onAddCalories, onOpenComments }) {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch(`YOUR_BACKEND_API_ENDPOINT?search=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch food items');
                }
                const data = await response.json();
                setFoodItems(data);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoodItems();
    }, [searchTerm]);

    return (
        <div className='cards'>
            <h1>Check out the top Dining Hall Menu Items!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {foodItems.map(item => (
                            <CardItem
                                key={item.id}
                                src={item.imageURL}
                                name={item.name}
                                description={item.description}
                                calories={item.calories}
                                dining_name={item.dining_name}
                                path='/services'
                                onAddCalories={onAddCalories} // Pass onAddCalories as prop
                                onOpenComments={onOpenComments} // Pass onOpenComments as prop
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;



// return (
//             <div className='cards'>
//             <h1> ~ Check out the top Dining Hall Menu Items! ~ </h1>
//             <div className='cards__container'>
//                 <div className='cards__wrapper'>
//                 <ul className='cards__items'>
//                     <CardItem
//                     src='/images/img-9.jpg'
//                     name='Juicy Chicken'
//                     description='Pretend this is scrumptious bplate chicken. Bro its literally 6AM, bplate literally opens in an hour.'
//                     calories='too many'
//                     dining_name='B-Plate'
//                     path='/services'
//                     onAddCalories = {onAddCalories}
//                     onOpenComments = {onOpenComments}
//                     />
//                     {/* <CardItem
//                     src='/images/img-2.jpg'
//                     text='Travel through the Islands of Bali in a Private Cruise'
//                     dining_name='Luxury'
//                     path='/services'
//                     /> */}
//                 </ul>
//                 <ul className='cards__items'>
//                     <CardItem
//                     src='/images/img-3.jpg'
//                     description='Lets pretend you see asian food here.'
//                     dining_name='Feast'
//                     path='/services'
//                     />
//                     <CardItem
//                     src='/images/img-4.jpg'
//                     description='Does anyone still eat here?'
//                     dining_name='De Neve'
//                     path='/products'
//                     />
//                     <CardItem
//                     src='/images/img-8.jpg'
//                     description='BEST dining hall for real.'
//                     dining_name='The Study'
//                     path='/sign-up'
//                     />
//                 </ul>
//                 </div>
//             </div>
//             </div>
//         );
//     }
    
//     export default Cards;
    