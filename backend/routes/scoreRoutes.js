let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js
// Adds a GET route to grab data from database; score collection
router.get('/', (req, res) => {
   Controllers.scoreController.getScores(res);
})
// Adds a POST route to set a new score 
router.post('/set', (req, res) => {
   Controllers.scoreController.setScore(req.body, res);
})

module.exports = router;