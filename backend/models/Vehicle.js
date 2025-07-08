const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a vehicle name']
  },
  brand: {
    type: String,
    required: [true, 'Please provide a vehicle brand']
  },
  model: {
    type: String,
    required: [true, 'Please provide a vehicle model']
  },
  year: {
    type: Number,
    required: [true, 'Please provide a vehicle year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide a registration number'],
    unique: true,
    uppercase: true,
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Please provide a vehicle color']
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic', 'cvt'],
    required: true
  },
  engineCapacity: {
    type: Number, // in cc
    required: true
  },
  mileage: {
    type: Number, // in km
    required: true
  },
  image: {
    type: String,
    required: [true, 'Please provide a vehicle image URL']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastServiceDate: {
    type: Date
  },
  nextServiceDue: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
vehicleSchema.index({ user: 1 });
vehicleSchema.index({ registrationNumber: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema); 