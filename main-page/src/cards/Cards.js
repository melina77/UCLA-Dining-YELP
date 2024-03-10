// import React from 'react';
import './Cards.css';
import './CardButton.css';
import CardItem from './CardItem';
import React, { useState, useEffect } from 'react';

// function Cards() {

//     // Example state and function in a parent component (e.g., Cards.js or App.js)

//     const [totalCalories, setTotalCalories] = useState(0);

//     const onAddCalories = (calories) => {
//         setTotalCalories(totalCalories + calories);
//         console.log("clicked the add food button! that's it sorry :( calorie count: ", calories);
//     };
//     // Pass onAddCalories down to each CardItem, where it's invoked with specific calorie values

//     // Example state and modal opening function in a parent component
//     const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
//     const [selectedItemId, setSelectedItemId] = useState(null);

//     const onOpenComments = (itemId) => {
//         setSelectedItemId(itemId);
//         setCommentsModalOpen(true);
//         console.log("clicked the comments button! that's it sorry :(");
//         // 🍅🍅🍅🍅🍅: IMPLEMENT OPENING THE COMMENTS
//     };
//     // In your render method, conditionally render a comments modal based on isCommentsModalOpen
        
//     return (
//         <div className='cards'>
//         <h1> ~ Check out the top Dining Hall Menu Items! ~ </h1>
//         <div className='cards__container'>
//             <div className='cards__wrapper'>
//             <ul className='cards__items'>
//                 <CardItem
//                 src='/images/img-9.jpg'
//                 name='Juicy Chicken'
//                 description='Pretend this is scrumptious bplate chicken. Bro its literally 6AM, bplate literally opens in an hour.'
//                 calories='too many'
//                 dining_name='B-Plate'
//                 path='/services'
//                 onAddCalories = {onAddCalories}
//                 onOpenComments = {onOpenComments}
//                 />
//                 {/* <CardItem
//                 src='/images/img-2.jpg'
//                 text='Travel through the Islands of Bali in a Private Cruise'
//                 dining_name='Luxury'
//                 path='/services'
//                 /> */}
//             </ul>
//             <ul className='cards__items'>
//                 <CardItem
//                 src='/images/img-3.jpg'
//                 description='Lets pretend you see asian food here.'
//                 dining_name='Feast'
//                 path='/services'
//                 />
//                 <CardItem
//                 src='/images/img-4.jpg'
//                 description='Does anyone still eat here?'
//                 dining_name='De Neve'
//                 path='/products'
//                 />
//                 <CardItem
//                 src='/images/img-8.jpg'
//                 description='BEST dining hall for real.'
//                 dining_name='The Study'
//                 path='/sign-up'
//                 />
//             </ul>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default Cards;

// 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 DYNAMIC 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸

function Cards() {
    // State to store fetched card data
    const [cardsData, setCardsData] = useState([]);

    // Fetch card data from the backend API
    useEffect(() => {
        const fetchCardsData = async () => {
            try {
                const response = await fetch('http://localhost:8080/f/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setCardsData(data);
            } catch (error) {
                console.error("Failed to fetch cards data:", error);
            }
        };

        fetchCardsData();
    }, []);

    // const [totalCalories, setTotalCalories] = useState(0);

    // const onAddCalories = (calories) => {
    //     setTotalCalories(totalCalories + calories);
    //     console.log("clicked the add food button! that's it sorry :(, calorie count: ", calories);
    // };
    // Pass onAddCalories down to each CardItem, where it's invoked with specific calorie values

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

    // const onAddCalories = (cardId, caloriesToAdd) => {
    //     // Your implementation here
    //     console.log("clicked the add food's calories to your calorie count button!");
    //     fetch('http://localhost:8080/count/', { //replace with URL of backend endpoint
    //     method: 'POST',
    //     body: ,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    //     })
    //     .then(response => {
    //     if(response.ok){
    //         console.log('Calories added successfully!');
    //         return response.json();
    //     }
    //     else{
    //         alert('Add Calories failed')
    //         console.error('Add Calories failed');
    //     }
    //     })
    //     .catch(error => {
    //     console.error('Network error: ', error);
    //     });
    // };

    const onAddCalories = async (foodId) => {
        const response = await fetch('http://localhost:8080/count/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers you need, such as authorization headers
            },
            body: JSON.stringify({
                foodId: foodId,
                // calories: calories
            })
        });
        const data = await response.json();
        return data;
    };


    // Render the cards dynamically
    return (
        <div className='cards'>
            <h1> ~ Check out the top Dining Hall Menu Items! ~ </h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {cardsData.map((card, index) => (
                            <CardItem
                                key={index}
                                src={card.image}
                                name={card.name}
                                description={card.description}
                                calories={card.calories}
                                dining_name={card.poster}
                                onAddCalories={() => onAddCalories(card.id)} // Pass card.id to onAddCalories // Assuming onAddCalories function is defined
                                onOpenComments={onOpenComments} // Assuming onOpenComments function is defined
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;
