let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); 
// Adds a GET route to grab data from the API to the database
router.get('/characters', (req, res) => {
   Controllers.apiController.API(res);
})

router.get('/questions', (req, res) => {
   Controllers.apiController.fetchQuestions(res);
})

module.exports = router;