"use strict";
const axios = require('axios');
let dbController = require('./dbController')

const API = (res) => {

  const perPage = 100; // Number of characters per page
  let page = 1; // Page number to start with
  let allCharacters = []; // Array to store all characters

  const fetchCharacters = () => { 
    fetch(`https://last-airbender-api.fly.dev/api/v1/characters?perPage=${perPage}&page=${page}`, {
        method: 'GET',
    })
    //checks if response is ok
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      // maps through each character to grab the required fields
        const characterRequests = data.map(async character => {
            try {
                const response = await axios.head(character.photoUrl);
                // makes sure the response is 200 so that it filters out the broken images
                if (response.status === 200) {
                    return {
                        name: character.name,
                        photoUrl: character.photoUrl,
                        affiliation: character.affiliation,
                        allies: character.allies,
                        enemies: character.enemies
                    };
                } else {
                  //let us know which character is missing an image
                    console.log(`${character.name}: Picture not found, skipping...`);
                    return null;
                }
            } catch (error) {
              // lets us know the error 
                console.error(`${character.name}: Error occurred while fetching picture, skipping...`);
                console.error(error.message);
                return null;
            }
        });

        // grabs all characters and filter out all the null ones out
        Promise.all(characterRequests)
        .then(characters => {
            const filteredCharacters = characters.filter(character => character !== null);
            // adds all to an array
            allCharacters = allCharacters.concat(filteredCharacters);
            // loops through if there are still pages with characters (if there are 20 on the page then continue)
            if (data.length === perPage) {
                page++;
                fetchCharacters();
            } else {
              // once done , it will save all to database
                dbController.saveCharactersToDatabase(allCharacters);
                res.send({ result: 200, characters: allCharacters });
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

  fetchCharacters();
}

const fetchQuestions = async(res)  => { 

  let allQuestions = [];
      // fetches all characters from the api
    fetch('https://api.sampleapis.com/avatar/questions', {
      method: 'GET',
    })
      //checks if network is ok
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      //with each question, grab all the fields
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
        //sends the array to be saved into database
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