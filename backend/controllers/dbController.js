"use strict";
const Models = require('../models');
const saveCustomersToDatabase = (characters) => {
    //inserts all the characters found from the api into the database
    return Models.Character.insertMany(characters);
};

module.exports = {
    saveCustomersToDatabase
}