import React, { useState, useEffect } from 'react';
import './search.css';

const Search = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data.map(user => ({
                    name: user.name,
                    email: user.email,
                    id: user.id
                })));
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="logo-container">
                    <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
                </div>
                <input
                    type="text"
                    placeholder="Search users"
                    onChange={handleSearch}
                />
            </header>
            <div>
                <div>
                    {users.map(user => (
                        <div key={user.id} className={user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm) ? '' : 'hide'}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;