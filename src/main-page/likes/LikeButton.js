import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Like Button on the food post cards
function LikeButton({ initialLikes, postId }) {
    // to display the total likes and indivate if the button is already liked by user
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState();

    // SET INITIALLY LIKED OR NOT
    useEffect(() => {
        const initiallyLiked = () => {
            // get token to get user.id and name
            const token = localStorage.getItem('authToken');

            // get fetch request to get the likes associated with a certain postId
            fetch(`http://localhost:8080/l/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            // set if the post is already liked by user
            .then(data => {
                setLiked(data.liked);
            })
            // catch any errors durign the get fetch request
            .catch(error => {
                console.error('Error:', error);
            });
        };
        initiallyLiked();
    }, []);

    // when like is clicked
    const toggleLike = () => {
        // get token to get user.id and name
        const token = localStorage.getItem('authToken');
        let decodedToken;
        // if token exists, decode it
        if (token) {
            decodedToken = jwtDecode(token);
        }
        // if user has "name", that means they are a dining user (dining users are not allowed to like posts)
        if (decodedToken.name) {
            alert("You are not allowed to like posts");
            return;
        }

        // when clicking the like button
        fetch('http://localhost:8080/l/', {
            method: 'POST',
            body: JSON.stringify({
                foodId: postId, 
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            setLiked(data.liked);
            // manually update likes:
            // the totalLikes wasn't updating bc it called toggleLike and fetchTotalLikes at the same time, so that’s why it doesnt update until the next time you click it
            if (liked){
                setLikes(likes - 1);
            }
            else{
                setLikes(likes + 1);
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });

        // fetch total likes by fetching for food items (within the toogleLike function)
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
            // filter the likes based on the food ID
            const food = foodItems.find(foodItem => foodItem.id === postId);
            // if can't find the foodID
            if (!food) {
                console.error('Food item not found');
                throw new Error('Food item not found');
            }
            // get the total like count by getting the length of the likes array
            setLikes(food.likes.length)
        })
        .catch(error => {
            console.error('Error fetching food likes:', error.message);
        });
    };

    // get the Total Likes from the food router (outside of toogleLike function)
    const fetchTotalLikes = async () => {
        try {
            // fetch all food items with their associated likes
            const response = await fetch('http://localhost:8080/f/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch food items');
            }
            const foodItems = await response.json();

            // filter the likes based on the food ID
            const food = foodItems.find(foodItem => foodItem.id === postId);
            // if cannot find the foodId
            if (!food) {
                console.error('Food item not found');
                throw new Error('Food item not found');
            }
            // set total likes by using the length of the likes array
            setLikes(food.likes.length)
        } catch (error) {
            console.error('Error fetching food likes:', error.message);
        }
    };
    
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
    );
}

export default LikeButton;