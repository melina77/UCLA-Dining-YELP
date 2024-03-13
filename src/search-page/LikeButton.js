import React, { useState } from "react";
import './LikeButton.js';

function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        if (liked) {
            // If already liked, decrement likes and set liked to false
            setLikes(likes - 1);
            setLiked(false);
        } else {
            // If not liked yet, increment likes and set liked to true
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    return (
        <button
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={toggleLike}
        >
            {likes} Likes
        </button>
    );
}

export default LikeButton;

// 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 WITH FETCH API 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸
// function LikeButton({ initialLikes, isInitiallyLiked, postId }) {
//     const [likes, setLikes] = useState(initialLikes);
//     const [liked, setLiked] = useState(isInitiallyLiked);

//     const toggleLike = () => {
//         const action = liked ? 'unlike' : 'like';
//         const url = `/api/likes/${postId}/${action}`;

//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Include any other headers your API requires
//             },
//             // If your API expects a body, include it here. For a like toggle, the body might not be necessary.
//         })
//         .then(response => response.json())
//         .then(data => {
//             // 🍅 ADJUST: this assumes the response includes the updated like count
//             setLikes(data.updatedLikes);
//             setLiked(!liked);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     };

//     return (
//         <button
//             className={`like-button ${liked ? 'liked' : ''}`}
//             onClick={toggleLike}
//         >
//             {likes} Likes
//         </button>
//     );
// }