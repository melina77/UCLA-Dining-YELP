
import React, { useState, useEffect } from 'react'; 
import "./counter.css"
import { jwtDecode } from 'jwt-decode';

function CalorieCounter() {
    // List to manage list of foods
    const [foods, setFoods] = useState([]);
    const [calories, setCalories] = useState('')
    const [totalFoodConsumed, setTotalFoodConsumed]  = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const authToken = localStorage.getItem('authToken');
    let decodedToken;
    if (authToken) {
      decodedToken = jwtDecode(authToken);
    }
    
    // Get total food and calories
    useEffect(() => {
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
    
        data.result.forEach(food => {
          // Check if there is a calorie value for each value
          if (food.calorie == undefined) {
            totalFood -= 1;
          }
          else {
            totalFood += 1;
            totalCalories += parseInt(food.calorie);
          }
          
        });
        if (totalFood < 0) {
          totalFood = 0;
        }
        setTotalFoodConsumed(totalFood);
        setTotalCalories(totalCalories);
      })
      .catch(error => console.error('Error fetching data:', error));
    }, [foods]);
  

    // Get individual food and calorie values

    

    // const newFood = { food: inputValue, calorie: calories };
    // setFoods([...foods, newFood]);

  
    return (
      <main>
        <div className='main-container'>
          <div className='counter-container'>
            <div className='counter-title'>
              <h2>Calorie Counter</h2>
            </div>
  
            <div className='food-calorie-title-container'>
              <div className='food-title'>
                <h3>Foods</h3>
              </div>
  
              <div className='calorie-title'>
                <h3>Calories</h3>
              </div>
            </div>
            <div className='counter-list-container-wrapper'>
              <div className='counter-list-container'>
                <div className='food-list-container'>
                  {foods.map((food, index) => (
                    <div key={index}>{food.food}</div>
                  ))}
                </div>
                <div className='calories-list-container'>
                  {foods.map((food, index) => (
                    <div key={index}>{food.calorie}</div>
                  ))}
                </div>
              </div>
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
