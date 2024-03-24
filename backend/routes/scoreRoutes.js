let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js
// Adds a GET route to grab data from database; orders collection
router.get('/', (req, res) => {
   Controllers.scoreController.getScores(res);
})
// Adds a POST route to create a new order
router.post('/set', (req, res) => {
   Controllers.scoreController.setScore(req.body, res);
})
// Adds a PUT route to update an order
// router.put('/:id', (req, res) => {
//    Controllers.orderController.updateOrder(req, res)
// })
// // Adds a PUT route to delete an order
// router.delete('/:id', (req, res) => {
//    Controllers.orderController.deleteOrder(req, res)
// })
module.exports = router;