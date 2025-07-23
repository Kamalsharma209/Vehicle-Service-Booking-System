import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:9999/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('userToken', data.token);
        window.location.href = '/'; // Redirect to homepage or dashboard
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, fontSize: '1.1rem', py: 1.5 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      <Box mt={3} textAlign="center">
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          New user?
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, py: 1.2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Login; 