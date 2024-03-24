const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const characterSchema = new Schema({
    //id: {type: String, trim: true, unique: true},
    photoUrl: { type: String, trim: true },
    name: { type: String, trim: true },
    numberOfOrders: {type: Number, default: 0 }
    
}, 
{
    versionKey: false // Exclude the versionKey (__v) field
}

);


module.exports = mongoose.model("character", characterSchema);