import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import ReviewSection from './ReviewSection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const carImages = [
  '/template-1.jpg',
  '/template-2.jpg',
  '/template-3.jpg',
  '/template-4.jpg',
  '/template-5.jpg',
];

const services = [
  { name: 'Oil Change', desc: 'Keep your engine running smoothly with regular oil changes.', image: '/oil change.jpg' },
  { name: 'Tire Rotation', desc: 'Extend the life of your tires and improve safety.', image: '/tire rotation.jpg' },
  { name: 'Brake Inspection', desc: 'Ensure your brakes are in top condition for safe driving.', image: '/brake inspection.jpg' },
  { name: 'Battery Replacement', desc: 'Replace old batteries to avoid breakdowns.', image: '/batterty replace.jpg' },
  { name: 'Car Spa & Cleaning', desc: 'Professional cleaning and detailing for your car.', image: '/car cleaning.jpg' },
  { name: 'Insurance Claims', desc: 'Hassle-free insurance claim assistance.', image: '/car insurance.jpg' },
  { name: 'Clutch & Body Parts', desc: 'Repair and replacement of clutch and body parts.', image: '/clutch and body part.jpg' },
  { name: 'Car Inspection', desc: 'Comprehensive multi-point car inspection.', image: '/car inspection.jpg' },
  { name: 'AC Service & Repair', desc: 'Keep your car cool with expert AC service.', image: '/ac service and repair.jpg' },
  { name: 'Suspension', desc: 'Suspension check and repair for a smooth ride.', image: '/suspension repair.jpg' },
  { name: 'Fitments', desc: 'Accessories and fitments installation.', image: '/fitments.jpg' },
];

const Home = () => (
  <>
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        Welcome to Vehicle Service Booking System
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Book and manage your vehicle services with ease.
      </Typography>
    </Box>
    {/* Car Theme Carousel */}
    <Box my={4}>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={5000}
        arrows={false}
      >
        {carImages.map((src, idx) => (
          <Box key={idx} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <img
              src={process.env.PUBLIC_URL + src}
              alt={`Car Service ${idx + 1}`}
              style={{ maxWidth: '500px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', margin: '0 auto' }}
            />
          </Box>
        ))}
      </Slider>
      <Typography variant="h5" color="primary" mt={2} align="center">
        Keep Your Car in Top Shape!
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Reliable, fast, and professional car service at your fingertips.
      </Typography>
    </Box>
    {/* Our Services Section */}
    <Box my={5}>
      <Typography variant="h4" gutterBottom align="center">Our Services</Typography>
      <Box display="flex" justifyContent="center">
        <Box maxWidth="900px" width="100%">
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
            {services.map((service) => (
              <Box key={service.name} width={{ xs: '100%', sm: '45%', md: '22%' }}>
                <Link to={`/services/${service.name.replace(/\s+/g, '-').toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
                    <CardContent>
                      <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
                        <img
                          src={process.env.PUBLIC_URL + service.image}
                          alt={service.name}
                          style={{ maxWidth: '100px', width: '100%', borderRadius: '8px', marginBottom: '0.5rem' }}
                        />
                      </Box>
                      <Typography variant="h6">{service.name}</Typography>
                      <Typography color="text.secondary">{service.desc}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
    <ReviewSection />
  </>
);

export default Home; 