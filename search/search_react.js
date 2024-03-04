import React, { useState, useEffect } from 'react';

const UserSearch = () => {
    const [users, setUsers] = useState([]);//state to hold user data
    const [searchTerm, setSearchTerm] = useState('');//state to hold search data

    useEffect(() => {//fetch user data when component mounts
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => { //transform fetched data and set it to state
                const updatedUsers = data.map(user => ({
                    name: user.name,
                    email: user.email,
                    id: user.id
                }));
                setUsers(updatedUsers);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    //handler function for search input change
    const handleSearch = (e) => {
        //get search term from input
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);//update search term state
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search users"
                onChange={handleSearch}
            />
            <div>
                {users.map(user => (//iterate over users and display user cards
                    <div key={user.id} className={user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm) ? '' : 'hide'}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSearch;
