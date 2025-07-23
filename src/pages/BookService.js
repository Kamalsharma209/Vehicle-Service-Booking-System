import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const vehicles = [
  { id: '64a1f1c2d1e4a2b3c4d5e7a1', name: 'Honda Civic' },
  { id: '64a1f1c2d1e4a2b3c4d5e7a2', name: 'Toyota Corolla' },
];

const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'netbanking', label: 'Netbanking' }
];

const BookService = () => {
  const [form, setForm] = useState({ name: '', vehicle: '', service: '', date: '', paymentMethod: 'cash', time: '10:00', upiId: '', cardNumber: '' });
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all available services from backend
    fetch('http://localhost:9999/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => setServices([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Find the selected service object
  const selectedService = services.find(s => s._id === form.service);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please login before booking a service.');
      navigate('/login');
      return;
    }

    if (!selectedService) {
      alert('Please select a valid service.');
      return;
    }
    const selectedVehicle = vehicles.find(v => v.id === form.vehicle);
    if (!selectedVehicle) {
      alert('Please select a valid vehicle.');
      return;
    }

    const bookingData = {
      serviceId: selectedService._id,
      vehicleId: selectedVehicle.id,
      scheduledDate: form.date,
      scheduledTime: form.time,
      paymentMethod: form.paymentMethod,
      upiId: form.paymentMethod === 'upi' ? form.upiId : undefined,
      cardNumber: form.paymentMethod === 'card' ? form.cardNumber : undefined
    };

    try {
      const response = await fetch('http://localhost:9999/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert('Service booked successfully!');
        setForm({ name: '', vehicle: '', service: '', date: '', paymentMethod: 'cash', time: '10:00', upiId: '', cardNumber: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>Book a Service</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField select fullWidth margin="normal" label="Vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} required>
          {vehicles.map((option) => (
            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
          ))}
        </TextField>
        <TextField select fullWidth margin="normal" label="Service Type" name="service" value={form.service} onChange={handleChange} required>
          {services.map((option) => (
            <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
          ))}
        </TextField>
        {/* Show price if a service is selected */}
        {selectedService && (
          <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
            Price: ₹{selectedService.price}
          </Typography>
        )}
        <TextField fullWidth margin="normal" label="Date" name="date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField fullWidth margin="normal" label="Time" name="time" type="time" value={form.time} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField select fullWidth margin="normal" label="Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
          {paymentMethods.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        {form.paymentMethod === 'upi' && (
          <TextField fullWidth margin="normal" label="UPI ID" name="upiId" value={form.upiId} onChange={handleChange} required />
        )}
        {form.paymentMethod === 'card' && (
          <TextField fullWidth margin="normal" label="Card Number" name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Book Now</Button>
      </form>
    </Box>
  );
};

export default BookService; 