import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Button, Chip } from '@mui/material';
import {
  Build as BuildIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Star as StarIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const About = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#F5F7FB',
      py: 8
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h1" 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            About TOP EXOTICS
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', borderBottomWidth: 3, borderColor: '#6C63FF', mb: 3 }} />
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Revolutionizing Luxury Car Services in Nigeria
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Chip label="Premium Services" color="primary" />
            <Chip label="Certified Technicians" color="primary" />
            <Chip label="24/7 Support" color="primary" />
            <Chip label="Nationwide Coverage" color="primary" />
          </Box>
        </Box>

        {/* Main Content */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 6, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
              
              {/* Paragraph 1 - Company Introduction */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StarIcon sx={{ color: '#6C63FF' }} />
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                  TOP EXOTICS emerged from a simple yet powerful observation: Nigeria's growing luxury car market 
                  lacked a dedicated, reliable service ecosystem. Founded by automotive enthusiasts who understood 
                  the unique needs of exotic car owners, we set out to create Nigeria's premier platform for 
                  luxury vehicle services.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Our journey began with a vision to bridge the gap between luxury car owners and specialized 
                  service providers. We recognized that owning a Ferrari, Lamborghini, or Rolls-Royce in Nigeria 
                  shouldn't mean compromising on service quality or convenience. Today, we're proud to be the 
                  trusted partner for exotic car owners across the country.
                </Typography>
              </Box>

              {/* Paragraph 2 - What We Do */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BuildIcon sx={{ color: '#6C63FF' }} />
                  What We Do
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                  We operate as a comprehensive digital marketplace that connects luxury car owners with 
                  meticulously vetted service providers. Our platform offers an extensive range of specialized 
                  services including routine maintenance, performance tuning, emergency repairs, detailing, 
                  and even concierge services for the most discerning clients.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Every service provider in our network undergoes a rigorous 12-point verification process, 
                  ensuring they possess the necessary certifications, experience, and equipment to handle 
                  high-end vehicles. We maintain strict quality standards and regularly audit our partners 
                  to guarantee consistent excellence.
                </Typography>
              </Box>

              {/* Paragraph 3 - How It Works */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SpeedIcon sx={{ color: '#6C63FF' }} />
                  How It Works
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                  Our streamlined process begins with a simple online booking where customers specify their 
                  vehicle make, model, and service requirements. Our AI-powered matching system instantly 
                  connects them with the most suitable certified technicians in their area.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  From initial consultation to service completion, we provide end-to-end support including 
                  real-time progress tracking, transparent pricing, and quality assurance. Our dedicated 
                  customer success team ensures every interaction exceeds expectations, maintaining the 
                  premium experience that luxury car owners deserve.
                </Typography>
              </Box>

              {/* Paragraph 4 - Our Commitment */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon sx={{ color: '#6C63FF' }} />
                  Our Commitment to Excellence
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                  At TOP EXOTICS, we understand that luxury car ownership transcends mere transportation—it's 
                  a lifestyle choice that demands exceptional service. Our commitment extends beyond connecting 
                  customers with providers; we curate experiences that reflect the sophistication and prestige 
                  of the vehicles we serve.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  We invest heavily in technology, training, and quality assurance to ensure every touchpoint 
                  delivers the premium experience our clients expect. From our intuitive booking platform to 
                  our 24/7 concierge service, every element is designed with luxury car owners in mind.
                </Typography>
              </Box>

              {/* Paragraph 5 - Future Vision */}
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUpIcon sx={{ color: '#6C63FF' }} />
                  Looking Forward
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                  As Nigeria's luxury automotive market continues its impressive growth trajectory, TOP EXOTICS 
                  is positioned to lead the digital transformation of premium car services. We're expanding our 
                  network across major cities while developing advanced features like predictive maintenance 
                  alerts and virtual service consultations.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Our vision encompasses a complete luxury car ecosystem, including partnerships with premium 
                  insurance providers, financing solutions, and exclusive member benefits. We're building the 
                  future of luxury car ownership in Nigeria, one exceptional service at a time.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Enhanced Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              {/* Key Features */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)', mb: 4 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3 }}>
                  Why Choose TOP EXOTICS?
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <SecurityIcon sx={{ color: '#6C63FF', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600}>Certified Providers</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Rigorously vetted and certified technicians
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <SpeedIcon sx={{ color: '#6C63FF', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600}>Quick Service</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Fast turnaround with quality assurance
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <StarIcon sx={{ color: '#6C63FF', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600}>Premium Quality</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Specialized expertise for luxury vehicles
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <PeopleIcon sx={{ color: '#6C63FF', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600}>24/7 Support</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    Round-the-clock customer service
                  </Typography>
                </Box>

                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <BuildIcon sx={{ color: '#6C63FF', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600}>Comprehensive Services</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    From maintenance to emergency repairs
                  </Typography>
                </Box>
              </Paper>

              {/* Contact Information */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3 }}>
                  Get In Touch
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <PhoneIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>+234-800-EXOTICS</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <EmailIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>info@topexotics.com</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <LocationIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>Lagos, Nigeria</Typography>
                  </Box>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                    color: '#fff',
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    py: 1.5,
                    '&:hover': { background: '#5A55E0' }
                  }}
                >
                  Contact Us
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Enhanced Stats Section */}
        <Box mt={8} textAlign="center">
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 2 }}>
            Our Impact in Numbers
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Delivering exceptional service across Nigeria's luxury automotive landscape
          </Typography>
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" sx={{ p: 3, background: '#fff', borderRadius: 3, boxShadow: '0 4px 16px rgba(108,99,255,0.08)' }}>
                <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
                  500+
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Luxury Cars Serviced
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Across all major brands
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" sx={{ p: 3, background: '#fff', borderRadius: 3, boxShadow: '0 4px 16px rgba(108,99,255,0.08)' }}>
                <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
                  50+
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Certified Providers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nationwide network
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" sx={{ p: 3, background: '#fff', borderRadius: 3, boxShadow: '0 4px 16px rgba(108,99,255,0.08)' }}>
                <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
                  98%
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Customer Satisfaction
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Consistently high ratings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" sx={{ p: 3, background: '#fff', borderRadius: 3, boxShadow: '0 4px 16px rgba(108,99,255,0.08)' }}>
                <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
                  24/7
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Support Available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Round-the-clock assistance
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 