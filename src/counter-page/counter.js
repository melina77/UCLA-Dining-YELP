
import React, { useState, useEffect } from 'react'; 
import "./counter.css"

function CalorieCounter() {
    // List to manage list of foods
    const [foods, setFoods] = useState([]);
    const [calories, setCalories] = useState('')
  
    // State to manage input value
    const [inputValue, setInputValue] = useState('');
  
    // State to manage add food button
    const [isEditing, setisEditing] = useState(false);
  
    // Make input bar visible
    const handleButtonClick = () => {
      setisEditing(true);
    };
  
    // Handles food and calorie submission
    const handleSubmit = () => {
      // Check if input has values in it
      if (inputValue.trim() !== '' && calories.trim() !== '') {
        // Sets food with corresponding calories
        setFoods([...foods, { food: inputValue, calorie: calories}]);
        setInputValue('');
        setCalories('');
      }
    };
  
    const handleCancel = () => {
      setisEditing(false);
      setInputValue('');
    }
  
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
                  <div className='add-item-container'>
                    {isEditing ? ( 
                      <div>
                        <input 
                            type="text"
                            value={inputValue}
                            placeholder="Enter food item"
                            onChange={(e) => setInputValue(e.target.value)}
                            
                          />
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                        <button onClick={handleButtonClick}>Add Food</button>
                    )}
                  </div>
                </div>
                <div className='calories-list-container'>
                  {foods.map((food, index) => (
                    <div key={index}>{food.calorie}</div>
                  ))}
                  {isEditing ? (
                    <div>
                      <input 
                        className='calories-input' 
                        type="text"
                        value={calories}
                        placeholder="Enter calories"
                        onChange={(e) => setCalories(e.target.value)}  
                      />
                    </div>
                  ) : (
                    null
                  )}
                </div>
              </div>
              <div className='total-container'>
                <div className='food-total-container'>
                  <p>Total Food Consumed Today: </p>
                </div>
                <div className='calorie-total-container'>
                  <p>Total Calories: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }



export default function CounterPage() {

  return (
    <div>
      <CalorieCounter />
    </div>
  )
}