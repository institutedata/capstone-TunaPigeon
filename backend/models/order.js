const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  customerName: { type: String, trim: true, required: true },
  tea: { type: String, trim: true, required: true },
  orderedAt: { type: Date, default: Date.now },
  status: {type: String, default: "Uncompleted"}
}, 
{
    versionKey: false // Exclude the versionKey (__v) field
}

);

module.exports = mongoose.model("order", orderSchema);