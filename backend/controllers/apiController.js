"use strict";

let dbController = require('./dbController')

const API = (res) => {

  const perPage = 100; // Number of characters per page
  let page = 1; // Page number to start with
  let allCharacters = []; // Array to store all characters

  const fetchCharacters = () => 
    { 
      // fetches all characters from the api
    fetch(`https://last-airbender-api.fly.dev/api/v1/characters?perPage=${perPage}&page=${page}`, {
      method: 'GET',
    })

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      //with each data/character, grab and map just the name and photoURL
      .then(data => {
        const characters = data.map(character => {
          return {
            // _id: character._id,
            name: character.name,
           photoUrl: character.photoUrl,
          };
        });
        //storing all characters into array
        allCharacters = allCharacters.concat(characters)
        //checks if theres pages left with 100 characters, and will keep looping and running the function
        if (data.length === perPage) {
          page++;
          fetchCharacters(); // Fetch next page recursively
        } 
        else {
          // If no more pages, send all characters in the response
          dbController.saveCustomersToDatabase(allCharacters);
          res.send({ result: 200, characters: allCharacters });
        }

      })
      .catch(err => {
        console.log(err);
        res.send({ result: 500, error: err.message })
        
      })
  }
  fetchCharacters();
}

module.exports = {
  API

}