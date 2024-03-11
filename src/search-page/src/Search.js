import React, { useState, useEffect } from 'react';
import './search.css';
import CardItem from './CardItem'; // Import the CardItem component

const Search = ({ setSearchTerm }) => {
    const [searchInput, setSearchInput] = useState('');
    const [cards, setCards] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/f/search/${searchInput}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            setCards(data); // Update the state with fetched cards
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="app">
            <header className="header">
                <input
                    type="text"
                    placeholder="Search for a post..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                    onKeyPress={handleKeyPress}
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
