const express = require('express');
const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user vehicles
// @route   GET /api/vehicles
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id, isActive: true })
      .sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    // Check if vehicle belongs to user
    if (vehicle.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(vehicle);
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Private
router.post('/', protect, [
  body('name').trim().notEmpty().withMessage('Vehicle name is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('model').trim().notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Valid year is required'),
  body('registrationNumber').trim().notEmpty().withMessage('Registration number is required'),
  body('color').trim().notEmpty().withMessage('Color is required'),
  body('fuelType').isIn(['petrol', 'diesel', 'electric', 'hybrid', 'cng']).withMessage('Valid fuel type is required'),
  body('transmission').isIn(['manual', 'automatic', 'cvt']).withMessage('Valid transmission is required'),
  body('engineCapacity').isNumeric().withMessage('Engine capacity must be a number'),
  body('mileage').isNumeric().withMessage('Mileage must be a number'),
  body('image').notEmpty().withMessage('Vehicle image is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if registration number already exists
    const existingVehicle = await Vehicle.findOne({ 
      registrationNumber: req.body.registrationNumber.toUpperCase() 
    });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle with this registration number already exists' });
    }

    const vehicle = await Vehicle.create({
      ...req.body,
      user: req.user._id,
      registrationNumber: req.body.registrationNumber.toUpperCase()
    });

    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private
router.put('/:id', protect, [
  body('name').optional().trim().notEmpty().withMessage('Vehicle name cannot be empty'),
  body('brand').optional().trim().notEmpty().withMessage('Brand cannot be empty'),
  body('model').optional().trim().notEmpty().withMessage('Model cannot be empty'),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Valid year is required'),
  body('color').optional().trim().notEmpty().withMessage('Color cannot be empty'),
  body('fuelType').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid', 'cng']).withMessage('Valid fuel type is required'),
  body('transmission').optional().isIn(['manual', 'automatic', 'cvt']).withMessage('Valid transmission is required'),
  body('engineCapacity').optional().isNumeric().withMessage('Engine capacity must be a number'),
  body('mileage').optional().isNumeric().withMessage('Mileage must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check if vehicle belongs to user
    if (vehicle.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if registration number is being changed and if it already exists
    if (req.body.registrationNumber && req.body.registrationNumber !== vehicle.registrationNumber) {
      const existingVehicle = await Vehicle.findOne({ 
        registrationNumber: req.body.registrationNumber.toUpperCase(),
        _id: { $ne: req.params.id }
      });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle with this registration number already exists' });
      }
      req.body.registrationNumber = req.body.registrationNumber.toUpperCase();
    }

    Object.assign(vehicle, req.body);
    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check if vehicle belongs to user
    if (vehicle.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Soft delete - set isActive to false
    vehicle.isActive = false;
    await vehicle.save();
    
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 