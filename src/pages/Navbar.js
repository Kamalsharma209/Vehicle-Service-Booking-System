import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  Menu, 
  MenuItem, 
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { 
  Build as BuildIcon,
  CleaningServices as CleaningIcon,
  Engineering as EngineeringIcon,
  Emergency as EmergencyIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  AttachMoney as PriceIcon,
  BatteryChargingFull as BatteryIcon,
  LocalCarWash as CarWashIcon,
  AcUnit as ACIcon,
  DirectionsCar as CarIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Book Service', to: '/book' },
  { label: 'Services', to: '/services', hasDropdown: true },
  { label: 'About', to: '/about' },
];

// Services data matching the service section
const services = [
  { name: 'Oil Change', icon: <BuildIcon />, desc: 'Engine oil replacement and filter change' },
  { name: 'Tire Rotation', icon: <SettingsIcon />, desc: 'Even tire wear and safety check' },
  { name: 'Brake Inspection', icon: <VisibilityIcon />, desc: 'Comprehensive brake system check' },
  { name: 'Battery Replacement', icon: <BatteryIcon />, desc: 'New battery installation and testing' },
  { name: 'Car Spa & Cleaning', icon: <CarWashIcon />, desc: 'Professional detailing and cleaning' },
  { name: 'Insurance Claims', icon: <PriceIcon />, desc: 'Hassle-free insurance assistance' },
  { name: 'Clutch & Body Parts', icon: <EngineeringIcon />, desc: 'Repair and replacement services' },
  { name: 'Car Inspection', icon: <CarIcon />, desc: 'Multi-point vehicle inspection' },
  { name: 'AC Service & Repair', icon: <ACIcon />, desc: 'AC system maintenance and repair' },
  { name: 'Suspension', icon: <SettingsIcon />, desc: 'Suspension system check and repair' },
  { name: 'Fitments', icon: <BuildIcon />, desc: 'Accessories and fitments installation' },
];

const Navbar = () => {
  const location = useLocation();
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);

  const handleServicesClick = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchorEl(null);
  };

  const handleServiceClick = (serviceName) => {
    const formattedName = serviceName.replace(/\s+/g, '-').toLowerCase();
    window.location.href = `/services/${formattedName}`;
    handleServicesClose();
  };

  return (
    <AppBar position="static" elevation={0} sx={{ background: '#fff', color: '#222', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80 }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src={process.env.PUBLIC_URL + '/GoMechanic.jpg'}
            alt="Logo"
            style={{ height: 48, width: 48, borderRadius: '12px', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: 1 }}>GO MECHANIC</Typography>
            <Typography variant="caption" color="text.secondary">Exotics Car Service Booking In India</Typography>
          </Box>
        </Box>
        
        {/* Navigation Links */}
        <Box display="flex" alignItems="center" gap={3}>
          {navLinks.map(link => {
            if (link.hasDropdown) {
              return (
                <Button
                  key={link.to}
                  onClick={handleServicesClick}
                  sx={{
                    color: location.pathname.startsWith('/services') ? '#6C63FF' : '#222',
                    fontWeight: location.pathname.startsWith('/services') ? 700 : 500,
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: 'none',
                    boxShadow: 'none',
                    '&:hover': { color: '#6C63FF', background: 'none' }
                  }}
                  disableRipple
                >
                  {link.label}
                </Button>
              );
            }
            return (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: location.pathname === link.to ? '#6C63FF' : '#222',
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  fontSize: '1rem',
                  textTransform: 'none',
                  background: 'none',
                  boxShadow: 'none',
                  '&:hover': { color: '#6C63FF', background: 'none' }
                }}
                disableRipple
              >
                {link.label}
              </Button>
            );
          })}
          {/* Login and Register Buttons */}
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '1rem',
              px: 3,
              py: 1.2,
              ml: 2,
              textTransform: 'none',
              color: '#6C63FF',
              borderColor: '#6C63FF',
              '&:hover': { background: '#f3f2fd', borderColor: '#5A55E0' }
            }}
          >
            Login
          </Button>
        </Box>
        
        {/* Become a member Button */}
        <Button
          component={Link}
          to="/membership"
          variant="contained"
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
        >
          Become a member
        </Button>
      </Toolbar>

      {/* Services Dropdown Menu */}
      <Menu
        anchorEl={servicesAnchorEl}
        open={Boolean(servicesAnchorEl)}
        onClose={handleServicesClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(108,99,255,0.15)',
            '& .MuiMenuItem-root': {
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(108,99,255,0.08)',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => window.location.href = '/services'}>
          <ListItemIcon>
            <BuildIcon sx={{ color: '#6C63FF' }} />
          </ListItemIcon>
          <ListItemText 
            primary="All Services" 
            secondary="View complete service catalog"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </MenuItem>
        <Box sx={{ borderTop: '1px solid #e0e0e0', my: 1 }} />
        {services.map((service) => (
          <MenuItem 
            key={service.name} 
            onClick={() => handleServiceClick(service.name)}
            sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: 2,
              py: 2
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {service.icon}
            </ListItemIcon>
            <ListItemText 
              primary={service.name}
              secondary={service.desc}
              primaryTypographyProps={{ 
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
              secondaryTypographyProps={{ 
                fontSize: '0.8rem',
                color: 'text.secondary'
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Navbar; 