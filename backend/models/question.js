const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    //id: {type: String, trim: true, unique: true},
    question: { type: String, trim: true },
    possibleAnswers: [String],
    correctAnswer: {type: String, trim: true },
    
}, 
{
    versionKey: false // Exclude the versionKey (__v) field
}

);


module.exports = mongoose.model("question", questionSchema);

