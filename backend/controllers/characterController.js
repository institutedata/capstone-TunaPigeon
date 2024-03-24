"use strict";
let Models = require("../models"); // matches index.js
const getCharacters = (res) => {
    //shows all characters in the "character" collection
    Models.Character.find({})
        .then(data => res.send({result: 200, characters: data}))
        .catch(err => {
            console.log(err);
            res.send({result: 500, error: err.message})
        })  
}


module.exports = {
    getCharacters
}