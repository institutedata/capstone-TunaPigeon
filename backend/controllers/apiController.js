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

        const validCharacters = data.filter(character =>
          character.photoUrl
        );
        const characters = validCharacters.map(character => {
          return {
            // _id: character._id,
            name: character.name,
           photoUrl: character.photoUrl,
           affiliation: character.affiliation,
          allies: character.allies,
          enemies: character.enemies
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
          dbController.saveCharactersToDatabase(allCharacters);
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

const fetchQuestions = async(res)  => { 

  let allQuestions = [];
      // fetches all characters from the api
    fetch('https://api.sampleapis.com/avatar/questions', {
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
        const questions = data.map(question => {
          return {
            // _id: character._id,
            question: question.question,
            possibleAnswers: question.possibleAnsers,
            correctAnswer: question.correctAnswer,
          
          };
        });
        //storing all characters into array
        allQuestions = allQuestions.concat(questions)
        //checks if theres pages left with 100 characters, and will keep looping and running the function

          // If no more pages, send all characters in the response
          dbController.saveQuestionsToDatabase(allQuestions);
          res.send({ result: 200, questions: allQuestions });

      })
      .catch(err => {
        console.log(err);
        res.send({ result: 500, error: err.message })
        
      })
  }
  

module.exports = {
  API, fetchQuestions

}