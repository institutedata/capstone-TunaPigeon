"use strict";
let Models = require("../models"); // matches index.js
const getScores = async (res) => {
    // finds all orders
    try {
        // Retrieve scores from the database, sorted by score in descending order and timestamp in ascending order
        const topScores = await Models.Score.find().sort({ score: -1, timestamp: -1 }).limit(10);

        // Send the sorted scores to the frontend
        res.json(topScores);
        console.log(topScores)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const setScore = async (data, res) => {
    //add score to the collection

    new Models.Score(data).save()
        .then(data => res.send({ result: 200, order: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })

}

module.exports = {
    getScores, setScore
}