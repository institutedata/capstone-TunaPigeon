"use strict";
let Models = require("../models");

const getCharacters = (res, perPage, page) => {
    const offset = (page - 1) * perPage; // Calculate the offset based on the current page
    // Fetch characters with pagination
    Models.Character.find({})
        .skip(offset) // Skip characters based on the offset
        .limit(perPage) // Limit the number of characters per page
        .then(data => res.json(data)) //sends data directly
        .catch(err => {
            console.log(err);
            res.status(500).json({ result: 500, error: err.message });
        });
};

module.exports = {
    getCharacters
};
