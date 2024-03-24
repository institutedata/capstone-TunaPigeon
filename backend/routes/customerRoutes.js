let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js
// Adds a GET route to grab data from database; customers collection
router.get('/', (req, res) => {
    Controllers.customerController.getCustomers(req,res);
})


module.exports = router;