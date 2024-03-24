"use strict";
let Models = require("../models"); // matches index.js
//grabs all customers that have made an order
const getCustomers=  (req, res) => {
    Models.Customer.find({})
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ result: 404, message: "No customers" });
            }
            else{
                res.send({result: 200, customers: data})
            }
            })
        .catch(err => {
            console.log(err);
            res.send({result: 500, error: err.message})
        })  
};

module.exports = {
    getCustomers
}