const mongoose = require("mongoose");
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  name: { type: String },
  image: { type: String },
  bookingDate: [Object],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
