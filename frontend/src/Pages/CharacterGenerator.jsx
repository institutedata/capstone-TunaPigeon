import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./JasmineDragonBox.css";

//data for tea
const ListOftea = [
  { name: 'Metal Brew', ingredient: ["Black tea", "Peppermint", "Smokey tea", "Ginger"] },
  { name: 'Ba Sing Quon', ingredient: ["Green tea", "Rock sugar", "Chrysanthemum", "Ginger"] },
  { name: 'White Lotus Tile', ingredient: ["White tea", "Green tea", "Bergamot", "Lotus flower"] },
  { name: 'Bender Tea', ingredient: ["Oolong tea", "Dried hibiscus flowers", "Peppermint", "Lavender"] },
  { name: 'Appa Blend', ingredient: ["Black tea", "Milk", "Tapioca pearls", "Water"] },
  { name: 'Red-blooded Nephew', ingredient: ["Black tea", "Dried hibiscus flowers", "Cinnamon sticks", "Lemon"] },
  { name: 'Cucumber aloe juice', ingredient: ["Water", "Cucumber", "Agave syrup", "Aloe vera"] },
  { name: 'Jasmine green tea', ingredient: ["Green tea", "Jasmine flowers", "Water", "Lemon"] },
  { name: 'Jasmine green tea kombucha', ingredient: ["Green tea", "Jasmine flowers", "Water", "Ginger"] },
  { name: 'Lychee juice', ingredient: ["Lychees", "Water", "Lemon", "Peppermint"] },
  { name: 'Tea leaf juice', ingredient: ["White tea", "Water", "Lemon", "Peppermint"] }
];

//data for ingredients
const ListOfIngredients = ["Black tea",
  "Peppermint",
  "Smokey tea",
  "Ginger",
  "Green tea",
  "Rock sugar",
  "Chrysanthemum",
  "White tea",
  "Bergamot",
  "Lotus flower",
  "Oolong tea",
  "Dried hibiscus flowers",
  "Lavender",
  "Milk",
  "Tapioca pearls",
  "Water",
  "Cinnamon sticks",
  "Lemon",
  "Cucumber",
  "Agave syrup",
  "Aloe vera",
  "Jasmine flowers",
  "Lychees"]


//props to send
const APIData = ({ onNameChange, onTeaValidationSuccess, TeaReceieved, TeaIngredients, CorrectIngredients, PhotoURL }) => {
  // grab name and set name for the random character generator as it changes every click
  const [name, setName] = useState(null);
  // similar to above
  const [photoUrl, setPhotoUrl] = useState(null);
  // has a loading screen to show customers coming in
  const [loading, setLoading] = useState(true);
  //grabs the tea that is randomly generated
  const [selectedTea, setSelectedTea] = useState('');
  //prevents generator from running twice
  const initialMount = useRef(true);
  //shows error message when tea is inputted wrong
  const [showError, setShowError] = useState(false);



  //grabs random character and random tea 
  const fetchNewCharacter = async () => {
    try {
      //starts the loading until character is generated
      setLoading(true);
      let response;
      let characters;

      // Fetch data from the API until a single character is received; in this case it will always grab one since its a random character generator
      do {
        response = await axios.get('https://last-airbender-api.fly.dev/api/v1/characters/random');
        characters = response.data;
      } while (characters.length !== 1);


      // Extracting name and photoUrl from the response data
      const { name, photoUrl } = characters[0];

      try {
        // Check if the photoUrl is valid by making a HEAD request
        const imageResponse = await axios.head(photoUrl);

        // If the image exists (status code 200), proceed
        if (imageResponse.status === 200) {
          // Setting name and photoUrl in state
          setName(name);
          onNameChange(name);
          setPhotoUrl(photoUrl);

          //calculates using listOfTea length
          const randomIndex = Math.floor(Math.random() * ListOftea.length);
          // Get the name of the tea at the random index
          const randomTea = ListOftea[randomIndex].name;
          // Set the selected tea in state
          setSelectedTea(randomTea);

          setLoading(false);
        } else {
          // If the image is broken or does not exist, log an error and retry fetching a new character
          console.error('Broken image URL:', photoUrl);
          fetchNewCharacter(); // Retry fetching a new character
        }
      } catch (error) {
        // If an error occurs during the HEAD request (e.g., network error), log the error and retry fetching a new character
        console.error(`Error fetching image for ${name}:`, error);
        fetchNewCharacter(); // Retry fetching a new character
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  // stops it from running twice
  useEffect(() => {
    if (initialMount.current) {
      fetchNewCharacter();
      initialMount.current = false;
    }

  }, []); // Empty dependency array to ensure useEffect runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the value entered in the tea input field
    const enteredTea = e.target.elements.tea?.value?.trim().toLowerCase();

    // Check if the entered tea matches the selected random tea
    if (enteredTea === selectedTea.toLowerCase()) {
      // Tea matches, proceed with order
      console.log('Tea matched:', enteredTea);
      //passes selectedSea to parent component
      TeaReceieved(selectedTea);
      onTeaValidationSuccess();
    } else {
      // Tea doesn't match, display error message
      console.error('Tea does not match the selected tea:', enteredTea);
      setShowError(true);

    }

    // grabs the tea and then grabs the ingredients for that tea
    const tea = ListOftea.find((item) => item.name.toLowerCase() === enteredTea);
    if (tea) {
      // Tea found, log its ingredients
      console.log('Tea Ingredients:', tea.ingredient);
      //sends the tea ingredients, and all the ingredients to parent components
      CorrectIngredients(tea.ingredient)
      TeaIngredients(ListOfIngredients)
      PhotoURL(photoUrl)
      console.log('PHOTO:', photoUrl);
    } else {
      // Tea not found, display error message or handle accordingly
      console.error('Tea not found:', enteredTea);
    }

  };

  return (
    <>

      <div className="JasmineTeaBox">

        {/* loading feature*/}
        {loading ? (<p>Next customer...</p>) : (
          <>
          {/* using variables set*/}
            <p>Name: {name}</p>
            <img src={photoUrl} alt="Character" style={{ height: '200px' }} />
            <p>"I would like to order {selectedTea}"</p>
            {/* submit will trigger tis function*/}
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:{name}</label>
              </div>
              <div>
                <label>Tea:
                  <input name="tea" />

                </label>

              </div>

              <button type="submit">Enter Order</button>

            </form>
            {showError && <div>Please enter in the correct tea</div>}
          </>
        )}
      </div>
    </>
  );
};

export default APIData;