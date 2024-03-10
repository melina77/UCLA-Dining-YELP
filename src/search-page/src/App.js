import React, { useState } from 'react';
import Cards from './Cards';
import Search from './Search';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            <Cards searchTerm={searchTerm}/>
        </div>
    );
};

export default HomePage;
