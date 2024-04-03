"use strict";
let Models = require("../models"); // matches index.js
const getQuestions = (res) => {
    //shows all characters in the "character" collection
    Models.Question.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.send({result: 500, error: err.message})
        })  
}


module.exports = {
    getQuestions
}