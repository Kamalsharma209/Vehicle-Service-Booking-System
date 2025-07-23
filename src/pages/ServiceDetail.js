import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, Grid, Button, Chip, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Rating, Alert, CircularProgress } from '@mui/material';

const ServiceDetail = () => {
  const { id } = useParams(); // id is actually the slug now
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9999/api/services/slug/${id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <Box p={4} textAlign="center"><CircularProgress /></Box>;
  if (error) return <Box p={4} textAlign="center"><Alert severity="error">{error}</Alert></Box>;
  if (!service) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <img src={service.image} alt={service.name} style={{ width: '100%', borderRadius: 12 }} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>{service.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>{service.category}</Typography>
            <Typography variant="body1" gutterBottom>{service.description}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Price: ₹{service.price}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Duration: {service.duration} min</Typography>
            {service.features && service.features.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Features:</Typography>
                <ul>
                  {service.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </Box>
            )}
            {service.benefits && service.benefits.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Benefits:</Typography>
                <ul>
                  {service.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </Box>
            )}
          </Grid>
        </Grid>
        {/* Reviews Section (if available) */}
        {service.reviews && service.reviews.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>Reviews</Typography>
            <List>
              {service.reviews.map((review, idx) => (
                <ListItem key={idx} alignItems="flex-start">
                  <ListItemIcon><Rating value={review.rating} readOnly size="small" /></ListItemIcon>
                  <ListItemText primary={review.comment} secondary={review.userName} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ServiceDetail; 