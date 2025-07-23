import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city' || name === 'state' || name === 'zipCode') {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:9999/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1200);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting to login...</Alert>}
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Address</Typography>
        <TextField fullWidth margin="normal" label="Street" name="street" value={form.address.street} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="City" name="city" value={form.address.city} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="State" name="state" value={form.address.state} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Zip Code" name="zipCode" value={form.address.zipCode} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>
      <Box mt={3} textAlign="center">
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Already have an account?
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, py: 1.2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Register; 