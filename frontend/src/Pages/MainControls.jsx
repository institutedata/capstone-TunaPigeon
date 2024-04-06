import { useState} from 'react';
import APIData from './CharacterGenerator';
import RowAndColumnSpacing from './InteractiveTeaGame';
import ResultsOfTeaGame from './ResultsOfTeaGame';
import PreparationPage from './PreparationPage';
import ClockInPage from './ClockInPage';
import axios from 'axios';

//main controls for the teashop game
const ParentComponent = () => {
  const [characterName, setCharacterName] = useState('');
  const [selectedTea, setSelectedTea] = useState('');
  const [showAPIData, setShowAPIData] = useState(false);
  const [showRowAndColumnSpacing, setShowRowAndColumnSpacing] = useState(false);
  const [receivedTea, setReceivedTea] = useState('');
  const [teaIngredients, setTeaIngredients] = useState('');
  const [correctTeaIngredients, setCorrectTeaIngredients]= useState('');
  const [characterPhoto, setCharacterPhoto]= useState('');
  const [showResults, setShowResults] = useState(false);
  const [showPreparations, setShowPreparations] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [score, setScore]= useState(0);
  const [showClockIn, setShowClockIn] = useState(true);
  const [playerName, setPlayerName]= useState('');
  const [orderId, setOrderId] = useState(null);


  //whenever character generator gets a new character, it will send that new name 
  const handleCharacterNameChange = (newName) => {
    setCharacterName(newName);

  };
  // if correct tea is submitted, grab and set that tea
  const handleTeaValidationSuccess = (tea) => {
    console.log("Entered tea:", tea);
    setReceivedTea(tea);
    sendDataToBackend(characterName, tea)
  };
  
  //when the button is clicked, it will hide the character generator and show preparations page
  const TeaGameButton = () => {
    setShowAPIData(false); // Hide APIData
    setShowPreparations(true)
    // console.log(receivedTea)
    
};

    //when timer runs out it will trigger this
const TeaGameStart = () => {
  setShowPreparations(false)
  setShowRowAndColumnSpacing(true)
};

// all correct ingredients for the entered tea will be set here
const handleCorrectTeaIngredients = (ingredients) => {
  console.log("correct tea ingredients:", ingredients);
  setCorrectTeaIngredients(ingredients);
};
// all ingredients will be set here
const handleTeaIngredients = (ingredients) => {
  console.log("all tea ingredients:", ingredients);
  setTeaIngredients(ingredients);
};

// validation for submission
const handleSubmit = (isCorrect) => {
  if (isCorrect) {
    // Logic to handle the case when the user submits with correct ingredients
    console.log('Congratulations! You selected the correct ingredients.');
    setShowRowAndColumnSpacing(false)
    setSubmissionStatus(isCorrect ? 'success' : 'failed');
    setShowResults(true); 
    setScore(score => score+1)
    
    console.log(receivedTea)
    // Additional actions like updating state, showing a success message, etc.
  } else {
    // Logic to handle the case when the user submits with incorrect ingredients
    console.log('Oops! Some ingredients are incorrect. Please try again.');
    setShowRowAndColumnSpacing(false)
    setSubmissionStatus(isCorrect ? 'success' : 'failed');
    setShowResults(true); 
    sendScoreToBackend(playerName, score)
    // Additional actions like resetting state, showing an error message, etc.
  }
};

//use the photo from the character that was generated
const handlePhoto = (photo) => {
  setCharacterPhoto(photo);
};

//after a round, goes back to generate character page
const handleNextCustomer = () => {
  setShowResults(false); 
  setShowAPIData(true); // Hide APIData
};
//after losing, goes back to generate character page
const handleRestartGame = () => {
  setShowResults(false); 
  setShowAPIData(true); // Hide APIData
  setScore(0)
};
//send data as order to the backend
const sendDataToBackend = (characterName, receivedTea) => {
  // Define the data object with the required fields
  const data = {
    customerName: characterName,
    tea: receivedTea
  };

  // Make a POST request to the backend API endpoint
  axios.post('http://localhost:8080/jasminedragon/create', data)
    .then(response => {
      // Handle success response
      console.log('Order created successfully:', response.data);
      
      console.log(response.data.tea);
      console.log(response.data.order._id);
      setOrderId(response.data.order._id)
    })
    .catch(error => {
      // Handle error response
      console.error('Error creating order:', error);
    });
};

//takes name entered and goes to next phase
const handlePlayerName = (playerName) => {
  setPlayerName(playerName);
  setShowClockIn(false);
  setShowAPIData(true);

};

// send score data to backend
const sendScoreToBackend = (playerName, score) => {
  // Define the data object with the required fields
  const data = {
    name: playerName,
    score: score
  };

  // Make a POST request to the backend API endpoint
  axios.post('http://localhost:8080/highscore/set', data)
    .then(response => {
      // Handle success response
      console.log('Score saved:', response.data);
    })
    .catch(error => {
      // Handle error response
      console.error('Error setting score:', error);
    });
};



  console.log(characterName)
  return (
    <div>
      {/* all these for the interactive tea game, to switch through different pages/phases of the game */}
    <div className="ParentComponent">
    {showClockIn && <ClockInPage PlayerNameReceieved={handlePlayerName}/>}
    {showPreparations &&<PreparationPage onTimerEnd={TeaGameStart} TeaIngredients={correctTeaIngredients} Tea={receivedTea}/>}  
        {showResults &&<ResultsOfTeaGame PhotoURL={characterPhoto} name={characterName} nextCustomer={handleNextCustomer} submissionStatus={submissionStatus} score={score} restartGame={handleRestartGame} playerName={playerName}/>}
        {showAPIData &&<APIData onNameChange={handleCharacterNameChange} selectedTea={selectedTea} onTeaValidationSuccess={TeaGameButton} TeaReceieved={handleTeaValidationSuccess} TeaIngredients={handleTeaIngredients} CorrectIngredients={handleCorrectTeaIngredients} PhotoURL={handlePhoto} />}
      {showRowAndColumnSpacing && <RowAndColumnSpacing Tea={receivedTea} Ingredients={teaIngredients} CorrectIngredients={correctTeaIngredients} onSubmit={handleSubmit} orderId={orderId}/>}
      
    </div>
    </div>
  );
};

export default ParentComponent;