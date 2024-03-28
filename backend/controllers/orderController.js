"use strict";
let Models = require("../models"); // matches index.js
const getOrders = (res) => {
    // finds all orders
    Models.Order.find({})
    .then(data => {
        if (data.length === 0) {
            res.status(404).json({ result: 404, message: "No orders" });
        }
        else{
            res.send({result: 200, orders: data})
        }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}
const createOrder = async (data, res) => {
    try {
        //checks the name inputted for customerName is a name in the "characters" collection
        const character = await  Models.Character.findOne({ name: data.customerName });
        //if it doesnt exist
        if (!character) {
            return res.status(400).json({result: 404, message: "Character not found." });
        }
        //if it does exist, create an order
        else {
            new Models.Order(data).save()
                .then(data => res.send({ result: 200, order: data }))
                .catch(err => {
                    console.log(err);
                    res.send({ result: 500, error: err.message })
                })
            //increases numberOfOrders whenever a character orders
            character.numberOfOrders = (character.numberOfOrders || 0) + 1;
            await character.save();
            
            //checks if the customer exists 
            const customer = await Models.Customer.findOne({ name: character.name });
            //if exists, numberofOrders updates
            if (customer) {
                customer.numberOfOrders = character.numberOfOrders;
                await customer.save();
            } else {
                // If customer is not found, create new customer
                const newCustomer = new Models.Customer({
                    name: character.name,
                    numberOfOrders: character.numberOfOrders
                });
                await newCustomer.save();
            } 
            
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: 500, error: err.message });
    }
}



const updateOrder = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        // Find the order by ID and update the status
        const updatedOrder = await Models.Order.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });
        
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



const deleteOrder = async (req, res) => {
    // deletes the user matching the ID from the param
    try {
        // Delete the order
        const deletedOrder = await Models.Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ result: 404, message: "Order not found" });
        }

        // Find the customer associated with the deleted order
        const customer = await Models.Customer.findOne({ name: deletedOrder.customerName });
        const character = await Models.Character.findOne({ name: deletedOrder.customerName });

        // Decrement the numberOfOrders counter
        if (customer.numberOfOrders > 0) {
            customer.numberOfOrders--;
            character.numberOfOrders--;
            await customer.save();
            await character.save();
        }

        // If numberOfOrders becomes 0, delete the customer
        if (customer.numberOfOrders === 0) {
            await Models.Customer.deleteOne({ _id: customer._id });
        }
        

        // Send response
        res.status(200).json({ result: 200, deletedOrder: deletedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};
    

module.exports = {
    getOrders, createOrder, updateOrder,deleteOrder
}