import React, { useState } from 'react';
import Cards from './Cards';
import Search from './Search';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleAddCalories = (calories) => {
        // Add logic to handle adding calories
        console.log("Adding calories:", calories);
    };

    const handleOpenComments = (itemId) => {
        // Add logic to handle opening comments
        console.log("Opening comments for item:", itemId);
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            <Cards searchTerm={searchTerm} onAddCalories={handleAddCalories} onOpenComments={handleOpenComments} />
        </div>
    );
};

export default HomePage;
