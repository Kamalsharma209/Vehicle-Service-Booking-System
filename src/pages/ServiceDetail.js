import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const services = [
  {
    name: 'Oil Change',
    desc: 'Keep your engine running smoothly with regular oil changes.',
    details: "Our oil change service includes draining old oil, replacing the oil filter, and filling your engine with high-quality oil suited for your vehicle. Regular oil changes help prevent engine wear and improve fuel efficiency.",
    price: '$49.99',
    image: '/oil change.jpg',
  },
  {
    name: 'Tire Rotation',
    desc: 'Extend the life of your tires and improve safety.',
    details: "Tire rotation helps ensure that your tires wear evenly, which can extend their lifespan and improve your car's handling. Our technicians will rotate your tires and check for any signs of wear or damage.",
    price: '$29.99',
    image: '/tire rotation.jpg',
  },
  {
    name: 'Brake Inspection',
    desc: 'Ensure your brakes are in top condition for safe driving.',
    details: "We thoroughly inspect your brake pads, rotors, and fluid to ensure your braking system is safe and effective. Early detection of brake issues can prevent costly repairs and keep you safe on the road.",
    price: '$39.99',
    image: '/brake inspection.jpg',
  },
  {
    name: 'Battery Replacement',
    desc: 'Replace old batteries to avoid breakdowns.',
    details: "Our battery replacement service includes testing your current battery, installing a new one if needed, and ensuring your vehicle's electrical system is functioning properly.",
    price: '$89.99',
    image: '/batterty replace.jpg',
  },
  {
    name: 'Car Spa & Cleaning',
    desc: 'Professional cleaning and detailing for your car.',
    details: "Our car spa and cleaning service includes exterior wash, interior vacuuming, polishing, and detailing to keep your car looking brand new.",
    price: '$59.99',
    image: '/car cleaning.jpg',
  },
  {
    name: 'Insurance Claims',
    desc: 'Hassle-free insurance claim assistance.',
    details: "We help you with the entire insurance claim process, from documentation to repair, ensuring a smooth and stress-free experience.",
    price: 'Varies',
    image: '/car insurance.jpg',
  },
  {
    name: 'Clutch & Body Parts',
    desc: 'Repair and replacement of clutch and body parts.',
    details: "Expert repair and replacement services for clutch systems and body parts, using genuine spares for safety and performance.",
    price: 'From $99.99',
    image: '/clutch and body part.jpg',
  },
  {
    name: 'Car Inspection',
    desc: 'Comprehensive multi-point car inspection.',
    details: "Our inspection covers all major systems and components, providing you with a detailed report on your car's health.",
    price: '$34.99',
    image: '/car inspection.jpg',
  },
  {
    name: 'AC Service & Repair',
    desc: 'Keep your car cool with expert AC service.',
    details: "We offer AC gas refilling, leak checks, and repairs to ensure your car's air conditioning works efficiently.",
    price: '$69.99',
    image: '/ac service and repair.jpg',
  },
  {
    name: 'Suspension',
    desc: 'Suspension check and repair for a smooth ride.',
    details: "Our technicians inspect and repair your car's suspension system for better handling and comfort.",
    price: 'From $79.99',
    image: '/suspension repair.jpg',
  },
  {
    name: 'Fitments',
    desc: 'Accessories and fitments installation.',
    details: "We install a wide range of car accessories and fitments, from seat covers to advanced electronics, tailored to your needs.",
    price: 'Varies',
    image: '/fitments.jpg',
  },
];

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.name.replace(/\s+/g, '-').toLowerCase() === serviceName);

  if (!service) {
    return <Typography variant="h5">Service not found.</Typography>;
  }

  return (
    <Box mt={5} display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src={process.env.PUBLIC_URL + service.image}
              alt={service.name}
              style={{ maxWidth: '300px', width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
            />
            <Typography variant="h4" gutterBottom>{service.name}</Typography>
            <Typography variant="h6" color="primary" gutterBottom>{service.price}</Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>{service.desc}</Typography>
            <Typography variant="body2" color="text.secondary">{service.details}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </Box>
  );
};

export default ServiceDetail; 