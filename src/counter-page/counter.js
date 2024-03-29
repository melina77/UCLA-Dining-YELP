
import React, { useState, useEffect } from 'react'; 
import "./counter.css"
import { jwtDecode } from 'jwt-decode';

function CalorieCounter() {
    const [foods, setFoods] = useState([]); // List to manage list of foods
    const [reloadPage, setReloadPage] = useState(false);  // Reload page after food list changes
    const [totalFoodConsumed, setTotalFoodConsumed]  = useState(0); // Store total food in calorie list
    const [totalCalories, setTotalCalories] = useState(0);  // Store total calories in calorie list

    const authToken = localStorage.getItem('authToken');  // Store the authentication token
    let decodedToken;
    if (authToken) {
      decodedToken = jwtDecode(authToken);  // Decode the token to get user information
    }

    // Get total food and calories and put them in the table
    useEffect(() => {
      if (!authToken) {
        return;
      }
      fetch(`http://localhost:8080/calorie-counter/${decodedToken.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        let totalFood = 0;
        let totalCalories = 0;
        const foodList = [];
    
        data.result.forEach(food => {
          // Check if there is a calorie value for each value
          if (food.calories == undefined) {
            totalFood -= 1;
          }
          else {
            // Add to total count
            totalFood += 1;
            totalCalories += parseInt(food.calories);

            // Set food and calories to array
            foodList.push(food);
          }
        });
        
        setFoods(foodList);

        if (totalFood < 0) {
          totalFood = 0;
        }

        // Set total food and total calories
        setTotalFoodConsumed(totalFood);
        setTotalCalories(totalCalories);
      })
      .catch(error => console.error('Error fetching data:', error));
    }, [reloadPage]);

    // Handle food removal
    const handleRemoval = async (id, food_calories) => {
      const response = await fetch('http://localhost:8080/calorie-counter/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
              foodId: id, 
              calories: food_calories,
          })
      });
      const data = await response.json();
      setReloadPage(prevState => !prevState); // Update variable each time removal button is pressed to rerender page
    };
  

    return (
      <main>
        {/* Container for entire page after header */}
        <div className='main-container'>
          <div className='counter-container'>
            <div className='counter-title'>
              <h2>Calorie Counter</h2>
            </div>
            {/* Container for food and calories header */}
            <div className='food-calorie-title-container'>
              <div className='food-title'>
                <h3>Foods</h3>
              </div>
  
              <div className='calorie-title'>
                <h3>Calories</h3>
              </div>
            </div>
            {/* Container for the calorie and food list */}
            <div className='counter-list-container-wrapper'>
              <div className='counter-list-container'>
                <div className='food-list-container'>
                  {/* Get individual food items by index */}
                  {foods.map((food, index) => (
                    <div className='individual-food-items' key={index}>
                      {food.foodName}
                      <button className='button-container' onClick={handleRemoval.bind(null, food.foodId, food.calories)}>
                        <img src="xbutton.png" alt="Remove Food" className='remove-food-button'/>
                      </button>
                    </div>
                  ))}
                </div>
                <div className='calories-list-container'>
                  {/* Get individual food calories by index */}
                  {foods.map((food, index) => (
                    <div key={index}>{food.calories}</div>
                  ))}
                </div>
              </div>
              {/* Container for total food and calories consumed */}
              <div className='total-container'>
                <div className='food-total-container'>
                  <p>Total Food Consumed Today: {totalFoodConsumed}</p>
                </div>
                <div className='calorie-total-container'>
                  <p>Total Calories: {totalCalories}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }



export default function CounterPage() {

  return (
    <div>
      <CalorieCounter />
    </div>
  )
}
