

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

//style for the buttons
const Item = styled(Paper)(({ theme, selected }) => ({
  backgroundColor: selected ? '#ffcc80' : (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

// props to parent component
export default function RowAndColumnSpacing({ Tea, Ingredients, CorrectIngredients, onSubmit }) {
  //list of ingredients shuffled to randomize it
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  //shows the selected button placements
  const [selectedIndices, setSelectedIndices] = useState([]);
  // shows the timer
  const [timer, setTimer] = useState(10);
  // sees if the timer is still running or not to do other functions
  const [isRunning, setIsRunning] = useState(true);
  // shows the error if needed
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    // Shuffle the ingredients array when the component mounts
    const shuffledArray = [...Ingredients].sort(() => Math.random() - 0.5);
    setSelectedIngredients(shuffledArray);
  }, [Ingredients]); // Re-shuffle when the ingredients prop changes


  useEffect(() => {
    // Start the timer when the component mounts
    const timerId = setInterval(() => {
      if (isRunning && timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0) {
        setIsRunning(false); // Stop the timer when it reaches 0
        onSubmit();
      }
    }, 1000);

    // Clean up the timer when the component unmounts or when the correct tea is submitted
    return () => clearInterval(timerId);
  }, [isRunning, timer, onSubmit]);

  
  const toggleIngredient = (ingredient, index) => {
    setShowError(false);

    // Check if the ingredient is already selected
    const isSelected = selectedIndices.includes(index);
  
    // Check if the maximum number of ingredients (4) has been reached
    if (!isSelected && selectedIndices.length >= 4) {
      // If maximum reached, don't allow selecting more
      return;
    }
  
    // Toggle the selection of ingredients
    setSelectedIndices((prevIndices) =>
      isSelected
        ? prevIndices.filter((item) => item !== index)
        : [...prevIndices, index]
    );
  };

  const handleSubmit = () => {
    // Validate selected ingredients against correct ingredients
    const isCorrect = CorrectIngredients.every((ingredient) =>
      selectedIngredients.includes(ingredient)
    );
//if correct do this
    if (isCorrectSelection)
  {
    console.log ("IT MATCHES")
    setIsRunning(false);
    onSubmit(isCorrect);
  }
  else {
    console.log ("what the")
    setShowError(true);
  }
    
  };


  // Get selected ingredients from the selected indices
  const selectedIngredientsArray = selectedIndices.map((index) => selectedIngredients[index]);
  const isCorrectSelection = selectedIngredientsArray.slice().sort().toString() === CorrectIngredients.slice().sort().toString();

  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '20px' }}>
        <h3>Ingredients needed for {Tea}</h3>
        <ul>
          {CorrectIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
            </li>
          ))}
        </ul>

        <h3>Selected Ingredients:</h3>
        <ul>
          {selectedIngredientsArray.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Tea Ingredients:</h3>
        <Grid container spacing={2}>
          {selectedIngredients.map((ingredient, index) => (
            <Grid item key={index} xs={3}>
              <Item
                onClick={() => toggleIngredient(ingredient, index)}
                selected={selectedIndices.includes(index)}
              >
                {ingredient}
              </Item>
            </Grid>
          ))}
        </Grid>
        <button onClick={handleSubmit}  disabled={selectedIndices.length !== 4 }>Submit</button>
        {showError && <div>Ingredients not correct</div>}
      </div>
      <div>
        <h3>Timer: {timer} seconds</h3>
      </div>
    </div>
  );
}