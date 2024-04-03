let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); 
// Adds a GET route to grab data from database; characters collection
router.get('/', (req, res) => {
   const { perPage, page } = req.query; 
   Controllers.characterController.getCharacters(res, perPage, page);
})

module.exports = router;