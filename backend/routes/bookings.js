const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Vehicle = require('../models/Vehicle');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { user: req.user._id };
    if (status) {
      query.status = status;
    }
    
    const bookings = await Booking.find(query)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service', 'name price duration description')
      .populate('vehicle', 'name brand model registrationNumber color')
      .populate('user', 'name email phone');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, [
  body('serviceId').notEmpty().withMessage('Service is required'),
  body('vehicleId').notEmpty().withMessage('Vehicle is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('scheduledTime').notEmpty().withMessage('Scheduled time is required'),
  body('paymentMethod').isIn(['cash', 'card', 'upi', 'netbanking']).withMessage('Valid payment method is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { serviceId, vehicleId, scheduledDate, scheduledTime, paymentMethod, specialInstructions } = req.body;

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if vehicle belongs to user
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || vehicle.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check if booking time is in the future
    const bookingDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    if (bookingDateTime <= new Date()) {
      return res.status(400).json({ message: 'Booking must be scheduled for future date/time' });
    }

    // Check for conflicting bookings (same vehicle, same time)
    const conflictingBooking = await Booking.findOne({
      vehicle: vehicleId,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      status: { $in: ['pending', 'confirmed', 'in-progress'] }
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Vehicle already has a booking at this time' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service: serviceId,
      vehicle: vehicleId,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      totalAmount: service.price,
      paymentMethod,
      specialInstructions
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, [
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']).withMessage('Valid status is required'),
  body('technicianNotes').optional().isString().withMessage('Technician notes must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, technicianNotes, completionNotes } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (technicianNotes) booking.technicianNotes = technicianNotes;
    if (completionNotes) booking.completionNotes = completionNotes;

    const updatedBooking = await booking.save();
    
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber')
      .populate('user', 'name email phone');

    res.json(populatedBooking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, [
  body('cancellationReason').notEmpty().withMessage('Cancellation reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cancellationReason } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if booking can be cancelled
    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: 'Booking cannot be cancelled' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;
    booking.cancelledBy = 'user';

    const updatedBooking = await booking.save();
    
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber');

    res.json(populatedBooking);
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add review to completed booking
// @route   PUT /api/bookings/:id/review
// @access  Private
router.put('/:id/review', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isLength({ max: 1000 }).withMessage('Review cannot exceed 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, review } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    booking.rating = rating;
    if (review) booking.review = review;

    const updatedBooking = await booking.save();
    
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber');

    res.json(populatedBooking);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings/admin/all
// @access  Private/Admin
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const bookings = await Booking.find(query)
      .populate('service', 'name price duration')
      .populate('vehicle', 'name brand model registrationNumber')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 