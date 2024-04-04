let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); 
// Adds a GET route to grab character data from the API to the database
router.get('/characters', (req, res) => {
   Controllers.apiController.API(res);
})
//grabs question data from api to the database
router.get('/questions', (req, res) => {
   Controllers.apiController.fetchQuestions(res);
})

module.exports = router;