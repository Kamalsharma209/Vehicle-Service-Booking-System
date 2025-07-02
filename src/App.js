import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Home from './pages/Home';
import BookService from './pages/BookService';
import Services from './pages/Services';
import Login from './pages/Login';
import BookingHistory from './pages/BookingHistory';
import Footer from './pages/Footer';
import ServiceDetail from './pages/ServiceDetail';
import './GoMechanicLogo.css';

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" mr={2}>
            <img
              src={process.env.PUBLIC_URL + '/GoMechanic.jpg'}
              alt="GoMechanic Logo"
              style={{ height: 80, width: 80, borderRadius: '50%', marginRight: 8, objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            />
          </Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/services">Services</Button>
          <Button color="inherit" component={Link} to="/book">Book Service</Button>
          <Button color="inherit" component={Link} to="/history">Booking History</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceName" element={<ServiceDetail />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
