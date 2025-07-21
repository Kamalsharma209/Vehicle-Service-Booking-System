import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Card, CardContent, Grid, CardMedia, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

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

function JarvisModal({ open, onClose }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  let recognition;

  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      // Simulate Jarvis response (replace with backend call if needed)
      setResponse(`You said: ${text}. (Jarvis would respond here.)`);
    };
    recognition.onerror = (event) => {
      setResponse(`Error: ${event.error}`);
    };
  }

  const startListening = () => {
    setTranscript("");
    setResponse("");
    setListening(true);
    recognition && recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition && recognition.stop();
  };

  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#222', color: '#fff', padding: 32, borderRadius: 16, minWidth: 350, boxShadow: '0 4px 32px #0008' }}>
        <h2>Jarvis Voice Assistant</h2>
        <div style={{ marginBottom: 16 }}>
          <button onClick={listening ? stopListening : startListening} style={{ marginRight: 8, padding: '8px 16px', borderRadius: 8, border: 'none', background: listening ? '#e74c3c' : '#27ae60', color: '#fff', fontWeight: 'bold' }}>
            {listening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#555', color: '#fff' }}>Close</button>
        </div>
        <div style={{ marginBottom: 8 }}><strong>You said:</strong> {transcript}</div>
        <div><strong>Jarvis:</strong> {response}</div>
      </div>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const carRef = useRef();
  const [jarvisOpen, setJarvisOpen] = useState(false);

  useEffect(() => {
    if (carRef.current) {
      carRef.current.style.animation = 'car-slide 5s ease-out forwards';
    }
  }, []);

  return (
    <>
      <Box sx={{ background: '#F5F7FB', minHeight: '100vh', py: 6 }}>
        <Paper elevation={0} sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 6 }, borderRadius: 4, background: '#fff', position: 'relative', overflow: 'visible' }}>
          {/* Hero Content */}
          <Box display={{ xs: 'block', md: 'flex' }} alignItems="center" justifyContent="space-between" position="relative">
            <Box flex={1} zIndex={2}>
              <Typography variant="subtitle1" color="primary" fontWeight={700} mb={1}>
                Rated #1 For Exotics Car Service Booking In Nigeria
              </Typography>
              <Typography variant="h2" fontWeight={800} mb={2} sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.1 }}>
                Top Exotic Car Service Booking At The Lowest Prices!
              </Typography>
              <Typography variant="h6" color="text.secondary" mb={4}>
                Top Exotics offers the largest and most exclusive selection of luxury car services and maintenance bookings in India.
              </Typography>
              <Box display="flex" gap={2} mb={5}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    boxShadow: '0 4px 16px rgba(108,99,255,0.10)',
                    textTransform: 'none',
                    '&:hover': { background: '#5A55E0' }
                  }}
                >
                  Book a Service
                </Button>
                <Button
                  variant="text"
                  size="large"
                  sx={{
                    color: '#222',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderBottom: '2px solid #222',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': { color: '#6C63FF', borderBottom: '2px solid #6C63FF', background: 'none' }
                  }}
                >
                  See all Services
                </Button>
              </Box>
            </Box>
            {/* Car Image over Purple BG */}
            <Box flex={1} display="flex" justifyContent="center" alignItems="center" position="relative" minHeight={320}>
              <Box
                sx={{
                  position: 'absolute',
                  right: { xs: 0, md: 40 },
                  top: { xs: 60, md: 40 },
                  width: { xs: 260, md: 420 },
                  height: { xs: 160, md: 260 },
                  background: 'linear-gradient(120deg, #6C63FF 80%, #5A55E0 100%)',
                  borderRadius: 8,
                  zIndex: 1,
                  boxShadow: '0 8px 32px rgba(108,99,255,0.10)',
                }}
              />
              <img
                ref={carRef}
                src={process.env.PUBLIC_URL + '/template-1.jpg'}
                alt="Exotic Car"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  maxWidth: 420,
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 32px rgba(108,99,255,0.10))',
                  left: 0,
                }}
                className="car-slide-animate"
              />
            </Box>
          </Box>
          {/* Date Picker & Search Bar */}
          <Paper elevation={3} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 3,
            position: 'absolute',
            left: '50%',
            bottom: -40,
            transform: 'translateX(-50%)',
            minWidth: { xs: '90%', md: 700 },
            background: '#fff',
            boxShadow: '0 4px 24px rgba(108,99,255,0.10)',
            zIndex: 10
          }}>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              sx={{ minWidth: 140, background: '#F5F7FB', borderRadius: 2 }}
              InputLabelProps={{ shrink: true }}
              placeholder="Choose date"
            />
            <TextField
              type="date"
              variant="outlined"
              size="small"
              sx={{ minWidth: 140, background: '#F5F7FB', borderRadius: 2 }}
              InputLabelProps={{ shrink: true }}
              placeholder="Choose date"
            />
            <TextField
              type="date"
              variant="outlined"
              size="small"
              sx={{ minWidth: 140, background: '#F5F7FB', borderRadius: 2 }}
              InputLabelProps={{ shrink: true }}
              placeholder="Return date"
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                boxShadow: '0 4px 16px rgba(108,99,255,0.10)',
                textTransform: 'none',
                '&:hover': { background: '#5A55E0' }
              }}
              startIcon={<SearchIcon />}
            >
              Search Services
            </Button>
          </Paper>
        </Paper>
        {/* Our Services Section */}
        <Box
          mt={12}
          mb={6}
          sx={{
            background: 'linear-gradient(120deg, #f5f7fb 60%, #e9e6fc 100%)',
            borderRadius: 4,
            py: { xs: 5, md: 8 },
            px: { xs: 1, md: 0 },
            boxShadow: '0 2px 24px rgba(108,99,255,0.04)',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Our Services
            </Typography>
            <Divider sx={{ width: 80, mx: 'auto', borderBottomWidth: 3, borderColor: '#6C63FF', mb: 1 }} />
            <Typography variant="subtitle1" color="text.secondary">
              Explore our most popular vehicle services and book with confidence.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box width="100%">
              <Grid container spacing={4} justifyContent="center">
                {(() => {
                  const rows = [];
                  const perRow = 3;
                  for (let i = 0; i < services.length; i += perRow) {
                    const rowServices = services.slice(i, i + perRow);
                    while (rowServices.length < perRow) rowServices.push(null); // pad with nulls
                    rows.push(rowServices);
                  }
                  return rows.map((row, rowIdx) => (
                    row.map((service, colIdx) => (
                      <Grid item xs={12} sm={6} md={4} key={rowIdx + '-' + colIdx}>
                        {service && (
                          <Card
                            sx={{
                              borderRadius: 3,
                              boxShadow: '0 2px 12px rgba(108,99,255,0.04)',
                              transition: 'box-shadow 0.2s',
                              position: 'relative',
                              overflow: 'visible',
                              '&:hover': { boxShadow: 8 },
                              pt: 0,
                            }}
                          >
                            {/* Accent bar */}
                            <Box sx={{
                              height: 6,
                              width: '100%',
                              background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            }} />
                            <CardContent>
                              <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
                                <CardMedia
                                  component="img"
                                  image={process.env.PUBLIC_URL + service.image}
                                  alt={service.name}
                                  sx={{ height: 90, width: 'auto', borderRadius: 2, mb: 1, objectFit: 'cover', boxShadow: '0 2px 8px rgba(108,99,255,0.08)' }}
                                />
                              </Box>
                              <Typography variant="h6" fontWeight={600} gutterBottom align="center">{service.name}</Typography>
                              <Typography color="text.secondary" align="center" mb={2}>{service.desc}</Typography>
                              <Box display="flex" justifyContent="center">
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    borderRadius: 2,
                                    borderColor: '#6C63FF',
                                    color: '#6C63FF',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    px: 2,
                                    '&:hover': { background: '#f5f7fb', borderColor: '#5A55E0', color: '#5A55E0' }
                                  }}
                                  onClick={() => {
                                    const formattedName = service.name.replace(/\s+/g, '-').toLowerCase();
                                    navigate(`/services/${formattedName}`);
                                  }}
                                >
                                  Learn More
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        )}
                      </Grid>
                    ))
                  ));
                })()}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <button onClick={() => setJarvisOpen(true)} style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999, background: '#222', color: '#fff', borderRadius: '50%', width: 64, height: 64, fontSize: 32, border: 'none', boxShadow: '0 2px 8px #0006' }} title="Open Jarvis Voice Assistant">
        🧠
      </button>
      <JarvisModal open={jarvisOpen} onClose={() => setJarvisOpen(false)} />
    </>
  );
};

export default Home; 