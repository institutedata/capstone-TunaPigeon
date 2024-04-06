import { useState, useEffect } from 'react';
import "./JasmineDragonBox.css";


const PreparationPage = ({onTimerEnd, TeaIngredients, Tea}) => {
    const [timer, setTimer] = useState(5); // Initial timer value in seconds
    //timer
    useEffect(() => {
      const interval = setInterval(() => {
        // Decrease timer by 1 second
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Repeat every 1 second
  
      // Clean up the interval on component unmount or when timer reaches 0
      return () => clearInterval(interval);
    }, []); // Empty dependency array ensures useEffect runs only once
  
    useEffect(() => {
      // Call the function passed as prop when timer reaches 0
      if (timer === 0) {
        onTimerEnd();
      }
    }, [timer, onTimerEnd]); // Re-run when timer or onTimerEnd function changes
  
    return (
      <div className='JasmineTeaBox'>
        {/* Render the timer value */}
        <h1>Loading order...</h1>
        <h2>Get ready to create your tea in {timer}</h2>
        <h3>Ingredients needed for {Tea}</h3>
        {/* shows the ingredients for the tea */}
          {TeaIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
            </li>
          ))}
        
      </div>
    );
  };

export default PreparationPage;