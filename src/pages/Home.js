import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => (
  <Box textAlign="center" mt={5}>
    <Typography variant="h3" gutterBottom>
      Welcome to Vehicle Service Booking System
    </Typography>
    <Typography variant="h6" color="text.secondary">
      Book and manage your vehicle services with ease.
    </Typography>
  </Box>
);

export default Home; 