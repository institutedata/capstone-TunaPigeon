let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); 
// Adds a GET route to grab data from database; characters collection
router.get('/', (req, res) => {
   Controllers.characterController.getCharacters(res);
})

module.exports = router;