const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a service description']
  },
  category: {
    type: String,
    required: [true, 'Please provide a service category'],
    enum: ['maintenance', 'repair', 'cleaning', 'inspection', 'emergency']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a service price'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please provide estimated duration']
  },
  image: {
    type: String,
    required: [true, 'Please provide a service image URL']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  warranty: {
    type: Number, // in days
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema); 