import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login submitted! (Demo only)');
    setForm({ email: '', password: '' });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Box>
  );
};

export default Login; 