"use strict";
const Models = require('../models');
const saveCharactersToDatabase = (characters) => {
    //inserts all the characters found from the api into the database
    return Models.Character.insertMany(characters);
};

const saveQuestionsToDatabase = (questions) => {
    //inserts all the question found from the api into the database
    return Models.Question.insertMany(questions);
};

module.exports = {
    saveCharactersToDatabase, saveQuestionsToDatabase
}