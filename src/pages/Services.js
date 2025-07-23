import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  CircularProgress,
  Alert,
  CardMedia,
  Divider,
  Container,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  Build as BuildIcon,
  CleaningServices as CleaningIcon,
  Engineering as EngineeringIcon,
  Emergency as EmergencyIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  AttachMoney as PriceIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Fallback services data with detailed information
const fallbackServices = [
  {
    _id: '1',
    name: 'Oil Change',
    description: 'Keep your engine running smoothly with regular oil changes.',
    detailedDescription: 'Our comprehensive oil change service includes draining old oil, replacing the oil filter, and filling your engine with high-quality oil suited for your vehicle. Regular oil changes help prevent engine wear and improve fuel efficiency. We use only premium-grade oils that meet or exceed manufacturer specifications.',
    category: 'maintenance',
    price: 4999,
    duration: 60,
    image: '/oil change.jpg',
    features: ['High-quality oil', 'Filter replacement', 'Multi-point inspection', 'Engine flush option'],
    benefits: ['Improved engine performance', 'Extended engine life', 'Better fuel efficiency', 'Reduced emissions']
  },
  {
    _id: '2',
    name: 'Tire Rotation',
    description: 'Extend the life of your tires and improve safety.',
    detailedDescription: 'Tire rotation helps ensure that your tires wear evenly, which can extend their lifespan and improve your car\'s handling. Our technicians will rotate your tires and check for any signs of wear or damage. We also adjust tire pressure and perform a comprehensive safety check.',
    category: 'maintenance',
    price: 2999,
    duration: 45,
    image: '/tire rotation.jpg',
    features: ['Even wear distribution', 'Safety check', 'Pressure adjustment', 'Wear pattern analysis'],
    benefits: ['Extended tire life', 'Improved handling', 'Better fuel economy', 'Enhanced safety']
  },
  {
    _id: '3',
    name: 'Brake Inspection',
    description: 'Ensure your brakes are in top condition for safe driving.',
    detailedDescription: 'We thoroughly inspect your brake pads, rotors, and fluid to ensure your braking system is safe and effective. Early detection of brake issues can prevent costly repairs and keep you safe on the road. Our inspection includes checking brake fluid levels and testing brake performance.',
    category: 'inspection',
    price: 3999,
    duration: 90,
    image: '/brake inspection.jpg',
    features: ['Pad inspection', 'Rotor check', 'Fluid level check', 'Performance testing'],
    benefits: ['Enhanced safety', 'Preventive maintenance', 'Cost savings', 'Peace of mind']
  },
  {
    _id: '4',
    name: 'Battery Replacement',
    description: 'Replace old batteries to avoid breakdowns.',
    detailedDescription: 'Our battery replacement service includes testing your current battery, installing a new one if needed, and ensuring your vehicle\'s electrical system is functioning properly. We also clean battery terminals and check the charging system to prevent future issues.',
    category: 'repair',
    price: 8999,
    duration: 30,
    image: '/batterty replace.jpg',
    features: ['Battery testing', 'New battery installation', 'Terminal cleaning', 'Charging system check'],
    benefits: ['Reliable starting', 'Prevent breakdowns', 'Longer battery life', 'Electrical system health']
  },
  {
    _id: '5',
    name: 'Car Spa & Cleaning',
    description: 'Professional cleaning and detailing for your car.',
    detailedDescription: 'Our car spa and cleaning service includes exterior wash, interior vacuuming, polishing, and detailing to keep your car looking brand new. We use premium cleaning products and techniques to restore your vehicle\'s showroom shine.',
    category: 'cleaning',
    price: 5999,
    duration: 120,
    image: '/car cleaning.jpg',
    features: ['Exterior wash', 'Interior vacuum', 'Polishing', 'Detailing'],
    benefits: ['Restored appearance', 'Protection from elements', 'Increased resale value', 'Professional finish']
  },
  {
    _id: '6',
    name: 'AC Service & Repair',
    description: 'Keep your car cool with expert AC service.',
    detailedDescription: 'We offer AC gas refilling, leak checks, and repairs to ensure your car\'s air conditioning works efficiently. Our comprehensive AC service includes checking refrigerant levels, cleaning filters, and testing system performance.',
    category: 'repair',
    price: 6999,
    duration: 90,
    image: '/ac service and repair.jpg',
    features: ['Gas refilling', 'Leak check', 'Filter replacement', 'Performance testing'],
    benefits: ['Optimal cooling', 'Energy efficiency', 'Clean air quality', 'System longevity']
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      console.log('Fetching services from API...');
      const response = await fetch('http://localhost:9999/api/services');
      console.log('API Response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Services data:', data);
        setServices(data);
      } else {
        console.log('API failed, using fallback data');
        setServices(fallbackServices);
        setError('Using demo data - API unavailable');
      }
    } catch (error) {
      console.log('Network error, using fallback data:', error);
      setServices(fallbackServices);
      setError('Using demo data - Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:9999/api/services/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        // Use fallback categories
        setCategories(['maintenance', 'repair', 'cleaning', 'inspection', 'emergency']);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Use fallback categories
      setCategories(['maintenance', 'repair', 'cleaning', 'inspection', 'emergency']);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'maintenance': return <BuildIcon />;
      case 'cleaning': return <CleaningIcon />;
      case 'repair': return <EngineeringIcon />;
      case 'emergency': return <EmergencyIcon />;
      case 'inspection': return <VisibilityIcon />;
      default: return <BuildIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'maintenance': return 'primary';
      case 'cleaning': return 'success';
      case 'repair': return 'error';
      case 'emergency': return 'warning';
      case 'inspection': return 'info';
      default: return 'default';
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service) => {
    const serviceName = service.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/services/${serviceName}`);
  };

  const handleLearnMore = (service) => {
    const serviceName = service.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/services/${serviceName}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#F5F7FB', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Our Services
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', borderBottomWidth: 3, borderColor: '#6C63FF', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our comprehensive range of automotive services designed to keep your vehicle in perfect condition
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#6C63FF',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                sx={{
                  borderRadius: 2,
                  borderColor: '#6C63FF',
                  color: '#6C63FF',
                  '&:hover': {
                    borderColor: '#5A55E0',
                    color: '#5A55E0',
                  },
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No services found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="flex-start">
            {filteredServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={service._id} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: '0 4px 24px rgba(108,99,255,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(108,99,255,0.15)',
                    },
                  }}
                  onClick={() => navigate(`/services/${service.name.replace(/\s+/g, '-').toLowerCase()}`)}
                >
                  {/* Category Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                    }}
                  >
                    <Chip
                      icon={getCategoryIcon(service.category)}
                      label={service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      color={getCategoryColor(service.category)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Service Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={process.env.PUBLIC_URL + service.image}
                    alt={service.name}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />

                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {/* Service Name */}
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                      {service.name}
                    </Typography>

                    {/* Service Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* Service Details */}
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <PriceIcon fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight={600} color="primary">
                          ₹{service.price?.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <ScheduleIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {service.duration} minutes
                        </Typography>
                      </Box>
                    </Box>

                    {/* Features Preview */}
                    {service.features && service.features.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" fontWeight={600} color="text.secondary" gutterBottom>
                          Features:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {service.features.slice(0, 2).map((feature, index) => (
                            <Chip
                              key={index}
                              label={feature}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                          {service.features.length > 2 && (
                            <Chip
                              label={`+${service.features.length - 2} more`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* Spacer to push button to bottom */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Learn More Button */}
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(service);
                      }}
                      endIcon={<ArrowIcon />}
                      sx={{
                        borderRadius: 2,
                        borderColor: '#6C63FF',
                        color: '#6C63FF',
                        fontWeight: 600,
                        textTransform: 'none',
                        py: 1,
                        mt: 2,
                        '&:hover': { 
                          background: '#f5f7fb', 
                          borderColor: '#5A55E0', 
                          color: '#5A55E0' 
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Stats Section */}
        <Box mt={8} textAlign="center">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Why Choose Our Services?
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <BuildIcon sx={{ fontSize: 40, color: '#fff' }} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Expert Technicians
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Certified professionals with years of experience
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <ScheduleIcon sx={{ fontSize: 40, color: '#fff' }} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fast turnaround times without compromising quality
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <PriceIcon sx={{ fontSize: 40, color: '#fff' }} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Competitive Pricing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Best value for money with transparent pricing
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 