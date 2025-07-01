import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

const services = [
  'Oil Change',
  'Tire Rotation',
  'Brake Inspection',
  'Battery Replacement',
];

const BookService = () => {
  const [form, setForm] = useState({ name: '', vehicle: '', service: '', date: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Service booked! (Demo only)');
    setForm({ name: '', vehicle: '', service: '', date: '' });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>Book a Service</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} required />
        <TextField select fullWidth margin="normal" label="Service Type" name="service" value={form.service} onChange={handleChange} required>
          {services.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField fullWidth margin="normal" label="Date" name="date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Book Now</Button>
      </form>
    </Box>
  );
};

export default BookService; 