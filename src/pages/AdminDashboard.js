import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Build as BuildIcon,
  BookOnline as BookingIcon,
  DirectionsCar as VehicleIcon,
  Logout as LogoutIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import ServicesManagement from './admin/ServicesManagement';
import UsersManagement from './admin/UsersManagement';
import BookingsManagement from './admin/BookingsManagement';
import VehiclesManagement from './admin/VehiclesManagement';
import AdminStats from './admin/AdminStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalServices: 0,
    totalVehicles: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch stats from backend
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:9999/api/users/stats/overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          totalBookings: data.totalBookings || 0,
          totalServices: data.totalServices || 0,
          totalVehicles: data.totalVehicles || 0,
          pendingBookings: data.pendingBookings || 0,
          completedBookings: data.completedBookings || 0,
          recentUsers: data.recentUsers || 0,
          revenue: data.revenue || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const tabs = [
    { label: 'Overview', icon: <DashboardIcon />, component: <AdminStats stats={stats} /> },
    { label: 'Services', icon: <BuildIcon />, component: <ServicesManagement /> },
    { label: 'Users', icon: <PeopleIcon />, component: <UsersManagement /> },
    { label: 'Bookings', icon: <BookingIcon />, component: <BookingsManagement /> },
    { label: 'Vehicles', icon: <VehicleIcon />, component: <VehiclesManagement /> }
  ];

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Admin Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VBD Admin Panel
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip 
              label="Admin" 
              color="secondary" 
              size="small" 
              icon={<CheckCircleIcon />} 
            />
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon />}
              color="#2196f3"
              subtitle="Registered users"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={<BookingIcon />}
              color="#4caf50"
              subtitle="All time bookings"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Bookings"
              value={stats.pendingBookings}
              icon={<ScheduleIcon />}
              color="#ff9800"
              subtitle="Awaiting confirmation"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue"
              value={`₹${stats.revenue.toLocaleString()}`}
              icon={<TrendingUpIcon />}
              color="#f44336"
              subtitle="Total earnings"
            />
          </Grid>
        </Grid>

        {/* Main Content */}
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {tabs[activeTab].component}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 