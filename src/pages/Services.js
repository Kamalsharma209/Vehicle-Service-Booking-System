import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const services = [
  { name: 'Oil Change', desc: 'Keep your engine running smoothly with regular oil changes.' },
  { name: 'Tire Rotation', desc: 'Extend the life of your tires and improve safety.' },
  { name: 'Brake Inspection', desc: 'Ensure your brakes are in top condition for safe driving.' },
  { name: 'Battery Replacement', desc: 'Replace old batteries to avoid breakdowns.' },
];

const Services = () => (
  <Box mt={5}>
    <Typography variant="h4" gutterBottom>Our Services</Typography>
    <Grid container spacing={3}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} md={3} key={service.name}>
          <Card>
            <CardContent>
              <Typography variant="h6">{service.name}</Typography>
              <Typography color="text.secondary">{service.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Services; 