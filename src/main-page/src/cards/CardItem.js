// import React from 'react';
// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LikeButton from '../likes/LikeButton';

function CardItem(props) {

    // Example handleAddFoodClick implementation
    const handleAddFoodClick = () => {
        // const caloriesFromFood = 100; // Placeholder value
        // props.onAddCalories(caloriesFromFood); // onAddCalories would be a function passed as a prop from the parent component
        props.onAddCalories();
    };
    
    // Example handleOpenCommentsClick implementation
    const handleOpenCommentsClick = () => {
        // Assuming you manage the comments visibility and possibly the current item ID in a parent component
        props.onOpenComments(true, props.itemId); 
    };
  
    return (
        <>
        <li className='cards__item'>
            <div className='cards__item__link'>
            <figure className='cards__item__wrap-dining_name' data-category={props.dining_name}>
                <img
                className='cards__item__img'
                src={`http://localhost:8080/images/${props.src}`}
                />
            </figure>
            <div className='cards__item__caption'>
                <h5 className='cards__item__caption_text'>Name: {props.name}</h5>
                <h5 className='cards__item__caption_text'>Description: {props.description}</h5>
                <h5 className='cards__item__caption_text'>Calorie Count: {props.calories}</h5>
                {/* <h5 className='cards__item__caption_text'>TESTING postId: {props.food_id}</h5> */}
                <div className='cards__item__buttons'>
                    <button onClick={handleAddFoodClick}>Add Food to Calories</button>
                    <button onClick={handleOpenCommentsClick}>Open or Add Comments</button>
                    <LikeButton postId={props.food_id} initialLikes={props.likes_array} />
                </div>
            </div>
            </div>
        </li>
        </>
    );
}

export default CardItem;

// 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 WITH FETCH API 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸

// function CardItem(props) {
//     // State for storing dynamic data
//     const [calories, setCalories] = useState(props.calories); // Assuming initial calorie count comes from props
//     const [comments, setComments] = useState([]); // Assuming comments are an array

//     // Fetch calorie count dynamically (could be triggered by an event or effect)
//     const fetchCalorieCount = async () => {
//         try {
//             const response = await fetch(`YOUR_API_ENDPOINT/calories?itemId=${props.itemId}`);
//             const data = await response.json();
//             setCalories(data.calories);
//         } catch (error) {
//             console.error("Failed to fetch calorie count:", error);
//         }
//     };

//     // Fetch comments dynamically
//     const fetchComments = async () => {
//         try {
//             const response = await fetch(`YOUR_API_ENDPOINT/comments?itemId=${props.itemId}`);
//             const data = await response.json();
//             setComments(data.comments);
//         } catch (error) {
//             console.error("Failed to fetch comments:", error);
//         }
//     };

//     // Example handleAddFoodClick implementation
//     const handleAddFoodClick = () => {
//         fetchCalorieCount(); // Fetch the calorie count dynamically
//         props.onAddCalories(calories); // Then, call the parent component's function with the updated calories
//     };

//     // Example handleOpenCommentsClick implementation
//     const handleOpenCommentsClick = () => {
//         fetchComments(); // Fetch comments dynamically
//         props.onOpenComments(true, props.itemId, comments); // Updated to pass comments
//     };

//     // You might also use useEffect to fetch initial data when the component mounts
//     useEffect(() => {
//         fetchCalorieCount();
//         fetchComments();
//     }, []); // Empty dependency array means this effect runs once on mount

//     return (
//         <>
//         <li className='cards__item'>
//             <div className='cards__item__link' to={props.path}>
//             <figure className='cards__item__wrap-dining_name' data-category={props.dining_name}>
//                 <img
//                 className='cards__item__img'
//                 alt='Travel Image'
//                 src={props.src}
//                 />
//             </figure>
//             <div className='cards__item__caption'>
//                 <h5 className='cards__item__caption_text'>Name: {props.name}</h5>
//                 <h5 className='cards__item__caption_text'>Description: {props.description}</h5>
//                 <h5 className='cards__item__caption_text'>Calorie Count: {calories}</h5>
//                 <div className='cards__item__buttons'>
//                     <button onClick={handleAddFoodClick}>Add Food to Calories</button>
//                     <button onClick={handleOpenCommentsClick}>Open or Add Comments</button>
//                     <LikeButton />
//                 </div>
//             </div>
//             </div>
//         </li>
//         </>
//     );
// }

// export default CardItem;