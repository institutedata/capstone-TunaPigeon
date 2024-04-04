const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const scoreSchema = new Schema({
    name: { type: String, trim: true },
    score: { type: Number, trim: true },
    timestamp: { type: Date, default: Date.now } // Add timestamp field
},
{
    versionKey: false // Exclude the versionKey (__v) field
});

scoreSchema.pre('save', async function(next) {
    try {
        // Sort scores in descending order of score and ascending order of timestamp
        const topScores = await this.constructor.find().sort({ score: -1, timestamp: 1 }).limit(10);
        
        // Check if the current score is higher than the lowest score among the top 10
        if (topScores.length === 10 && this.score < topScores[9].score) {
            throw new Error("Score is not high enough to be in the top 10.");
        }
        next();
    } catch (error) {
        next(error);
    }
});

// this is to format timestamp to NZ time
scoreSchema.methods.formatTimestampToNZT = function() {
    return moment(this.timestamp).tz("Pacific/Auckland").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = mongoose.model("score", scoreSchema);
