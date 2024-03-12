
import React, { useState, useEffect } from 'react'; 
import "./counter.css"
import { jwtDecode } from 'jwt-decode';

function CalorieCounter() {
    // List to manage list of foods
    const [foods, setFoods] = useState([]);
    const [reloadPage, setReloadPage] = useState(false);
    const [totalFoodConsumed, setTotalFoodConsumed]  = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const authToken = localStorage.getItem('authToken');
    let decodedToken;
    if (authToken) {
      decodedToken = jwtDecode(authToken);
    }

    // Get total food and calories and put them in the table
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
        const foodList = [];
    
        data.result.forEach(food => {
          console.log(food);
          // Check if there is a calorie value for each value
          if (food.calories == undefined) {
            totalFood -= 1;
          }
          else {
            totalFood += 1;
            totalCalories += parseInt(food.calories);
            console.log(food);
            // Set food and calories to array
            foodList.push(food);
          }
        });
        
        setFoods(foodList);

        if (totalFood < 0) {
          totalFood = 0;
        }
        setTotalFoodConsumed(totalFood);
        setTotalCalories(totalCalories);
      })
      .catch(error => console.error('Error fetching data:', error));
    }, [reloadPage]);


    const handleRemoval = async (id, food_calories) => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/calorie-counter/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add any additional headers you need, such as authorization headers
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              foodId: id, 
              calories: food_calories,
          })
      });
      const data = await response.json();
      setReloadPage(prevState => !prevState);
      
    };
  

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
                    <div className='individual-food-items' key={index}>
                      {food.foodName}
                      <button className='button-container' onClick={handleRemoval.bind(null, food.foodId, food.calories)}>
                        <img src="xbutton.png" alt="Remove Food" className='remove-food-button'/>
                      </button>
                    </div>
                  ))}
                </div>
                <div className='calories-list-container'>
                  {foods.map((food, index) => (
                    <div key={index}>{food.calories}</div>
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
