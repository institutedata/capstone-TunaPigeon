"use strict";
let Models = require("../models"); // matches index.js
const getOrders = (res) => {
    // finds all orders
    Models.Order.find({})
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ result: 404, message: "No orders" });
            }
            else {
                res.send({ result: 200, orders: data })
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}
const createOrder = async (data, res) => {
    //create order with the data 
    new Models.Order(data).save()
        .then(data => res.send({ result: 200, order: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}


const updateOrder = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        // Find the order by ID and update the status
        const updatedOrder = await Models.Order.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });
        //if order doesn't exist
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found', id });
        }

        // Return the updated order
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const deleteOrders = async (req, res) => {
    try {
        // Delete all orders
        const deletedOrders = await Models.Order.deleteMany();

        // If no orders were deleted, return a 404 status
        if (deletedOrders.deletedCount === 0) {
            return res.status(404).json({ result: 404, message: "No orders found" });
        }
        // Send response
        res.status(200).json({ result: 200, message: "All orders deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};


module.exports = {
    getOrders, createOrder, updateOrder, deleteOrders
}