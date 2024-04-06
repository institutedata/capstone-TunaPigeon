const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const characterSchema = new Schema({
    photoUrl: { type: String, trim: true },
    name: { type: String, trim: true },
    affiliation: {type: String, trim: true },
    allies: [String],
    enemies: [String]
    
}, 
{
    versionKey: false // Exclude the versionKey (__v) field
}

);

module.exports = mongoose.model("character", characterSchema);

