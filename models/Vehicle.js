const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  desc: { type: String },
  brand: { type: String, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema); 