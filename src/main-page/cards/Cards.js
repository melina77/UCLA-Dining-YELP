import './Cards.css';
import './CardButton.css';
import CardItem from './CardItem';
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


function Cards() {
    // State to store fetched card data
    const [cardsData, setCardsData] = useState([]);
    let decodedToken;
    const token = localStorage.getItem('authToken');
        if (token) {
            // Decode the token to extract user information
            decodedToken = jwtDecode(token);
        }

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

    

    // Example state and modal opening function in a parent component
    const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // get userID from local token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Decode the token to extract user information
            const decodedToken = jwtDecode(token);
            // Extract the userID from the decoded token
            return decodedToken.id; // Adjust the property name as per your JWT payload
        }
        alert("Unable to get this user's authToken");
        return null; // Token not found or invalid
    };

    // Add post to calories button!
    const onAddCalories = async (foodId, card_calories) => {
        if (decodedToken.name) {
            alert("You do not have access to calorie counter");
            return;
        }
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/calorie-counter/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers you need, such as authorization headers
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                foodId: foodId, 
                calories: card_calories
            })
        });
        const data = await response.json();
        return data;
    };

    // SEARCH BAR 
    const [searchTerm, setSearchTerm] = useState('');

    // Filter cardsData based on search term
    const filteredCards = cardsData.filter(card =>
        card.poster.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render the cards dynamically
    return (
        <div className='cards'>
            <h1> ⭐️ Check out the recent Dining Hall Menu Items! ⭐️ </h1>
            <input
                type="text"
                placeholder="🔍 Search by dining hall, food, or description..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {/* Now map over filteredCards instead of cardsData */}
                        {filteredCards.map((card, index) => (
                            <CardItem
                            key={index}
                            src={card.image}
                            name={card.name}
                            description={card.description}
                            calories={card.calories}
                            dining_name={card.poster}
                            onAddCalories={() => onAddCalories(card.id, card.calories)}
                            food_id={card.id}
                            likes_array={card.likes.length}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;