import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusForm, setStatusForm] = useState({
    status: '',
    technicianNotes: ''
  });
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, booking: null });
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/bookings/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'cancelled': return 'error';
      case 'confirmed': return 'primary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon />;
      case 'pending': return <ScheduleIcon />;
      case 'in-progress': return <ViewIcon />;
      case 'cancelled': return <CancelIcon />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/bookings/${deleteDialog.booking._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchBookings();
        setDeleteDialog({ open: false, booking: null });
      } else {
        setError('Failed to delete booking');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/vehicles/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles || []);
      }
    } catch {}
  };

  if (loading && bookings.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#F5F7FB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 }, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={700}>Bookings Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '1rem',
              px: 3,
              py: 1.2,
              boxShadow: '0 4px 16px rgba(108,99,255,0.10)',
              textTransform: 'none',
              '&:hover': { background: '#5A55E0' }
            }}
            onClick={() => {}}
          >
            Add Booking
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(108,99,255,0.04)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#F5F7FB' }}>
                <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Vehicle</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#F5F7FB' } }}>
                  <TableCell>{booking.user?.name}</TableCell>
                  <TableCell>{booking.service?.name}</TableCell>
                  <TableCell>{booking.vehicle?.name}</TableCell>
                  <TableCell>{formatDate(booking.scheduledDate)}</TableCell>
                  <TableCell>
                    <Chip label={booking.status} color={getStatusColor(booking.status)} size="small" icon={getStatusIcon(booking.status)} />
                  </TableCell>
                  <TableCell>
                    <Chip label={booking.paymentStatus} color={booking.paymentStatus === 'completed' ? 'success' : 'warning'} size="small" />
                  </TableCell>
                  <TableCell>
                    ₹{booking.totalAmount?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {}}><ViewIcon /></IconButton>
                    <IconButton color="error" onClick={() => setDeleteDialog({ open: true, booking })}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Dialogs and forms would be similarly restyled for modern look */}
      </Box>
    </Box>
  );
};

export default BookingsManagement; 