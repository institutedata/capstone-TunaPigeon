import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
export default function RowAndColumnSpacing({ Tea, Ingredients, CorrectIngredients, onSubmit, orderId }) {
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

  //when clicking ingredients
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

    // console.log(orderId)
    //if correct do this
    if (isCorrectSelection) {
      console.log("IT MATCHES")
      //send these data and run the function
      setIsRunning(false);
      handleUpdateStatus();
      onSubmit(isCorrect);
    }
    else {
      console.log("what the")
      setShowError(true);
    }

  };

  //updates the status of the orders 
  const handleUpdateStatus = async () => {
    try {
        const response = await axios.put(`http://localhost:8080/jasminedragon/orders/${orderId}`);
        console.log('Status updated successfully:', response.data);
        // Handle any additional logic after the status is updated
    } catch (error) {
        console.error('Error updating status:', error);
        // Handle error scenarios
    }
};


  // Get selected ingredients from the selected indices
  const selectedIngredientsArray = selectedIndices.map((index) => selectedIngredients[index]);
  const isCorrectSelection = selectedIngredientsArray.slice().sort().toString() === CorrectIngredients.slice().sort().toString();

  return ( 
  // using divs to layout this onto the right side
       
  // uses this style to create a box around
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)',  border: '1px solid black',  padding: '50px'}}>
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '20px' , marginTop: '40px'}}>
        <h3>Ingredients needed for {Tea}</h3>
        <ul>
          {CorrectIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
            </li>
          ))}
        </ul>

      </div>

      <div>
        {/* grids for the buttons*/}
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
      {/* div to make the timer go on the other side */}
      <div style={{ marginLeft: '20px' , marginTop: '40px'}}>
        <h3>Timer: {timer} seconds</h3>
      </div>
    </div>
    </div>
  );
}