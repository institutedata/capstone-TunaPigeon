let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js
// Adds a GET route to grab orders from database; orders collection
router.get('/', (req, res) => {
   Controllers.orderController.getOrders(res);
})
// Adds a POST route to create a new order
router.post('/create', (req, res) => {
   Controllers.orderController.createOrder(req.body, res);
})
// Adds a PUT route to update an order
router.put('/orders/:id', (req, res) => {
   Controllers.orderController.updateOrder(req, res)
})
// // Adds a PUT route to delete an order
router.delete('/orders/delete', (req, res) => {
   Controllers.orderController.deleteOrders(req, res)
})
module.exports = router;