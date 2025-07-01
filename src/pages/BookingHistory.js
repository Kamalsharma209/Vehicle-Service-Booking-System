import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const bookings = [
  { id: 1, name: 'John Doe', vehicle: 'Honda Civic', service: 'Oil Change', date: '2024-07-01' },
  { id: 2, name: 'Jane Smith', vehicle: 'Toyota Corolla', service: 'Tire Rotation', date: '2024-07-05' },
];

const BookingHistory = () => (
  <Box mt={5}>
    <Typography variant="h4" gutterBottom>Booking History</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.vehicle}</TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default BookingHistory; 