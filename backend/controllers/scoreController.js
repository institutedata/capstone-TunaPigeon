"use strict";
let Models = require("../models"); // matches index.js
const getScores = (res) => {
    // finds all orders
    Models.Score.find({})
    .then(data => {
        if (data.length === 0) {
            res.status(404).json({ result: 404, message: "No orders" });
        }
        else{
            res.send({result: 200, orders: data})
        }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const setScore = async (data, res) => {
    

            new Models.Score(data).save()
                .then(data => res.send({ result: 200, order: data }))
                .catch(err => {
                    console.log(err);
                    res.send({ result: 500, error: err.message })
                })
            
        
    
}

module.exports = {
    getScores,setScore
}