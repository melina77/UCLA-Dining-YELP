import React, { useState, useEffect } from 'react';
import './search.css';
import ReactDOM from 'react-dom';
import CardItem from './CardItem'; // Import the CardItem component
import setSearchTerm from './App.js';

const Search = ({ searchTerm, setSearchTerm }) => {
    const [cards, setCards] = useState([]);


    useEffect(() => {
        // Fetch cards from the backend based on the search term
        const fetchCards = async () => {
            try {
                if (searchTerm) { // Add a check for searchTerm
                    const response = await fetch(`http://localhost:8080/f/search/${searchTerm}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch cards');
                    }
                    const data = await response.json();
                    setCards(data); // Update the state with fetched cards
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };
    
        fetchCards();
    }, [searchTerm]); // Fetch cards when searchTerm changes

    return (
        <div className="app">
            <header className="header">
                {/* <div className="logo-container">
                    <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
                </div> */}
                <input
                    type="text"
                    placeholder="Search for a post..."
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
            </header>
            <div>
                <div>
                    {cards.map(card => (
                        <CardItem
                            key={card.id}
                            src={card.imageURL}
                            name={card.name}
                            description={card.description}
                            calories={card.calories}
                            dining_name={card.dining_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
