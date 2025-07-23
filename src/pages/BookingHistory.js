import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Please login to view your booking history.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:9999/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings || []);
        } else {
          setError('Failed to fetch bookings.');
        }
      } catch (err) {
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>Booking History</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.service?.name || '-'}</TableCell>
                  <TableCell>{row.vehicle?.name || '-'}</TableCell>
                  <TableCell>{row.scheduledDate ? new Date(row.scheduledDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookingHistory; 