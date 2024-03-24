let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); 
// Adds a GET route to grab data from the API to the database
router.get('/', (req, res) => {
   Controllers.apiController.API(res);
})

module.exports = router;