// 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 WITH FETCH API 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸
import React, { useState, useEffect } from "react";

function LikeButton({ initialLikes, postId }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState();
    // const [totalLikes, setTotalLikes] = useState(0); // Define totalLikes state

    // SET INITIALLY LIKED OR NOT
    useEffect(() => {
        const initiallyLiked = () => {
            // const action = liked ? 'unlike' : 'like';
            // // const url = `/api/likes/${postId}/${action}`;

            // get token to get user.id and name
            const token = localStorage.getItem('authToken');

            fetch(`http://localhost:8080/l/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers your API requires
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                // 🍅 ADJUST: this assumes the response includes the updated like count
                // setLikes(data.updatedLikes);
                setLiked(data.liked);
                console.log("Calling Initially Liked: ", liked);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
        initiallyLiked();
    }, []);

    // when like is clicked
    const toggleLike = () => {
        // const action = liked ? 'unlike' : 'like';
        // // const url = `/api/likes/${postId}/${action}`;

        // get token to get user.id and name
        const token = localStorage.getItem('authToken');

        // when clicking the like button
        fetch('http://localhost:8080/l/', {
            method: 'POST',
            body: JSON.stringify({
                foodId: postId, 
            }),
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers your API requires
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            setLiked(data.liked);
            console.log("LIKED STATUS: ", liked);
            // ADJUSTED: had to manually update likes bc:
                // the totalLikes wasn't updating bc it called toggleLike and fetchTotalLikes at the same time, so that’s why it doesnt update until the next time you click it
            if (liked){
                setLikes(likes - 1);
            }
            else{
                setLikes(likes + 1);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // FETCH TOTAL LIKES WITHIN TOGGLE LIKE 🐙
        fetch('http://localhost:8080/f/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch food items');
            }
            return response.json();
        })
        .then(foodItems => {
            // Filter the likes based on the food ID
            const food = foodItems.find(foodItem => foodItem.id === postId);
            if (!food) {
                console.error('Food item not found');
                throw new Error('Food item not found');
            }
            console.log('totalLikes INSIDE toggleLike:  Food likes:', food.likes.length);
            setLikes(food.likes.length)
        })
        .catch(error => {
            console.error('Error fetching food likes:', error.message);
        });
    };

    // get the Total Likes from the food router
    // useEffect(() => {
    const fetchTotalLikes = async () => { // deleted async
        try {
            // fetch all food items with their associated likes
            const response = await fetch('http://localhost:8080/f/', { // deleted await
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch food items');
            }
            const foodItems = await response.json(); // deleted await

            // Filter the likes based on the food ID
            const food = foodItems.find(foodItem => foodItem.id === postId);
            if (!food) {
                console.error('Food item not found');
                throw new Error('Food item not found');
            }
            console.log('fetchTotalLikes: Food likes length:', food.likes.length);
            setLikes(food.likes.length)
        } catch (error) {
            console.error('Error fetching food likes:', error.message);
        }
    };

    //     fetchTotalLikes();
    // }, []);
    
    return (
        <div className='like-button'>
            <button
            className={`${liked ? 'liked' : ''}`}
            onClick={() => {
                // fetchTotalLikes();
                toggleLike();
                fetchTotalLikes();
            }}
            >
            ❤️ {likes}
            </button>
        </div>
        // <button
        //     className={`like-button ${liked ? '' : 'liked'}`}
        //     onClick={() => {
        //         // fetchTotalLikes();
        //         toggleLike();
        //         fetchTotalLikes();
        //     }}
        // >
        //     ❤️ {likes}
        // </button>
    );
}

export default LikeButton;