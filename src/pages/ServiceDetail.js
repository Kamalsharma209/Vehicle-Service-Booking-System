import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  AttachMoney as PriceIcon,
  Build as BuildIcon,
  CleaningServices as CleaningIcon,
  Engineering as EngineeringIcon,
  Emergency as EmergencyIcon,
  Visibility as VisibilityIcon,
  BookOnline as BookIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

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
    benefits: ['Improved engine performance', 'Extended engine life', 'Better fuel efficiency', 'Reduced emissions'],
    whatIncluded: [
      'Drain and replace engine oil',
      'Replace oil filter',
      'Check oil level and quality',
      'Inspect for leaks',
      'Reset oil change indicator',
      'Multi-point inspection'
    ],
    whyImportant: 'Regular oil changes are crucial for maintaining engine health. Oil lubricates engine components, reduces friction, and helps cool the engine. Over time, oil breaks down and becomes contaminated, which can lead to increased wear and reduced performance.'
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
    benefits: ['Extended tire life', 'Improved handling', 'Better fuel economy', 'Enhanced safety'],
    whatIncluded: [
      'Rotate tires according to manufacturer specifications',
      'Check tire pressure and adjust',
      'Inspect for wear patterns',
      'Check for damage or punctures',
      'Balance wheels if needed',
      'Safety inspection'
    ],
    whyImportant: 'Tire rotation ensures even wear across all tires, which extends their lifespan and maintains optimal handling and safety. Front and rear tires wear differently due to steering and weight distribution.'
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
    benefits: ['Enhanced safety', 'Preventive maintenance', 'Cost savings', 'Peace of mind'],
    whatIncluded: [
      'Inspect brake pads and rotors',
      'Check brake fluid level and condition',
      'Test brake pedal feel and response',
      'Inspect brake lines and hoses',
      'Check parking brake operation',
      'Road test for brake performance'
    ],
    whyImportant: 'Brakes are your vehicle\'s most critical safety system. Regular inspections help identify wear and potential issues before they become safety hazards or cause expensive damage to other components.'
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
    benefits: ['Reliable starting', 'Prevent breakdowns', 'Longer battery life', 'Electrical system health'],
    whatIncluded: [
      'Test current battery condition',
      'Remove old battery safely',
      'Clean battery terminals and cables',
      'Install new battery with proper specifications',
      'Test charging system',
      'Verify all electrical systems work'
    ],
    whyImportant: 'A healthy battery is essential for reliable vehicle operation. Modern vehicles have complex electrical systems that require a strong, stable power source. Battery failure can leave you stranded and may damage other electrical components.'
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
    benefits: ['Restored appearance', 'Protection from elements', 'Increased resale value', 'Professional finish'],
    whatIncluded: [
      'Exterior hand wash and dry',
      'Interior vacuum and cleaning',
      'Dashboard and console cleaning',
      'Window cleaning inside and out',
      'Tire and wheel cleaning',
      'Interior air freshening'
    ],
    whyImportant: 'Regular professional cleaning not only keeps your car looking great but also protects the paint and interior from damage. A well-maintained appearance can significantly increase your vehicle\'s resale value.'
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
    benefits: ['Optimal cooling', 'Energy efficiency', 'Clean air quality', 'System longevity'],
    whatIncluded: [
      'Check refrigerant levels',
      'Test system performance',
      'Inspect for leaks',
      'Clean or replace cabin filter',
      'Check compressor operation',
      'Verify temperature control'
    ],
    whyImportant: 'A properly functioning AC system is essential for comfort and safety, especially in hot weather. Regular service helps maintain efficiency, prevent breakdowns, and ensure clean air circulation.'
  }
];

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceName]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first
      const response = await fetch(`http://localhost:9999/api/services/${serviceName}`);
      
      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        // Use fallback data
        const fallbackService = fallbackServices.find(s => 
          s.name.replace(/\s+/g, '-').toLowerCase() === serviceName
        );
        
        if (fallbackService) {
          setService(fallbackService);
        } else {
          setError('Service not found');
        }
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      // Use fallback data
      const fallbackService = fallbackServices.find(s => 
        s.name.replace(/\s+/g, '-').toLowerCase() === serviceName
      );
      
      if (fallbackService) {
        setService(fallbackService);
      } else {
        setError('Service not found');
      }
    } finally {
      setLoading(false);
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

  const handleBookService = () => {
    navigate('/book-service', { state: { selectedService: service } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Service not found'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/services')}
        >
          Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ background: '#F5F7FB', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box mb={3}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/services')}
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
            Back to Services
          </Button>
        </Box>

        {/* Service Header */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, background: '#fff' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <img
                  src={process.env.PUBLIC_URL + service.image}
                  alt={service.name}
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
                <Chip
                  icon={getCategoryIcon(service.category)}
                  label={service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  color={getCategoryColor(service.category)}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                {service.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                {service.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PriceIcon color="primary" />
                    <Typography variant="h5" fontWeight={700} color="primary">
                      ₹{service.price?.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ScheduleIcon color="action" />
                    <Typography variant="body1" color="text.secondary">
                      {service.duration} minutes
                    </Typography>
                  </Box>
                </Box>
                
                <Rating value={4.8} precision={0.1} readOnly sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Rated 4.8/5 by 150+ customers
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<BookIcon />}
                onClick={handleBookService}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5A55E0 0%, #6A5ACD 100%)',
                  },
                }}
              >
                Book This Service
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Detailed Information */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Detailed Description */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, background: '#fff' }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                About This Service
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                {service.detailedDescription}
              </Typography>
              
              {service.whyImportant && (
                <>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3, color: '#2c3e50' }}>
                    Why This Service is Important
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {service.whyImportant}
                  </Typography>
                </>
              )}
            </Paper>

            {/* What's Included */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, background: '#fff' }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                What's Included
              </Typography>
              <List>
                {service.whatIncluded?.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Features and Benefits */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: '#fff' }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#2c3e50' }}>
                    Key Features
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {service.features?.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: '#fff' }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#2c3e50' }}>
                    Benefits
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {service.benefits?.map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Quick Book Card */}
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, background: '#fff' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#2c3e50' }}>
                  Quick Book
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                    ₹{service.price?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.duration} minutes • {service.category}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<BookIcon />}
                  onClick={handleBookService}
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5A55E0 0%, #6A5ACD 100%)',
                    },
                  }}
                >
                  Book Now
                </Button>
              </Paper>

              {/* Contact Info */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: '#fff' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#2c3e50' }}>
                  Need Help?
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <PhoneIcon color="primary" fontSize="small" />
                    <Typography variant="body2">
                      +91 98765 43210
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationIcon color="primary" fontSize="small" />
                    <Typography variant="body2">
                      Mumbai, Maharashtra
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PhoneIcon />}
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
                  Call Us
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceDetail; 