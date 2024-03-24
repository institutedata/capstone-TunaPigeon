const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scoreSchema = new Schema({
    //id: {type: String, trim: true, unique: true },
    name: { type: String, trim: true },
    score: { type: Number, trim: true },
    // numberOfOrders: {type: Number, default: 0 }
    
}, 
{
    versionKey: false // Exclude the versionKey (__v) field
}

);


module.exports = mongoose.model("score", scoreSchema);