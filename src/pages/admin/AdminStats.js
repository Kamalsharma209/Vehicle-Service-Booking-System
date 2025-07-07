import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  BookOnline as BookingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const AdminStats = ({ stats }) => {
  const recentBookings = [
    { id: 1, service: 'Oil Change', user: 'John Doe', amount: 2999, status: 'completed' },
    { id: 2, service: 'Brake Inspection', user: 'Jane Smith', amount: 1499, status: 'pending' },
    { id: 3, service: 'AC Service', user: 'Mike Johnson', amount: 3999, status: 'in-progress' },
    { id: 4, service: 'Car Cleaning', user: 'Sarah Wilson', amount: 1999, status: 'completed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon />;
      case 'pending': return <ScheduleIcon />;
      case 'in-progress': return <TrendingUpIcon />;
      default: return null;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">User Growth</Typography>
                  <Typography variant="body2" color="primary">
                    +{stats.recentUsers} this month
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((stats.recentUsers / Math.max(stats.totalUsers, 1)) * 100, 100)} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Booking Completion Rate</Typography>
                  <Typography variant="body2" color="primary">
                    {Math.round((stats.completedBookings / Math.max(stats.totalBookings, 1)) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.round((stats.completedBookings / Math.max(stats.totalBookings, 1)) * 100)} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Revenue Growth</Typography>
                  <Typography variant="body2" color="primary">
                    ₹{stats.revenue.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((stats.revenue / 100000) * 100, 100)} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center" p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{stats.totalUsers}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Users</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center" p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <BookingIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{stats.totalBookings}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Bookings</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center" p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <ScheduleIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{stats.pendingBookings}</Typography>
                    <Typography variant="body2" color="textSecondary">Pending</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center" p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{stats.completedBookings}</Typography>
                    <Typography variant="body2" color="textSecondary">Completed</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Bookings
              </Typography>
              <Box>
                {recentBookings.map((booking, index) => (
                  <Box key={booking.id}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {booking.service}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.user}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="subtitle1" fontWeight="bold">
                          ₹{booking.amount}
                        </Typography>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                          icon={getStatusIcon(booking.status)}
                        />
                      </Box>
                    </Box>
                    {index < recentBookings.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminStats; 