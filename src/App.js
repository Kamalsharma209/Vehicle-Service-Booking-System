import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './pages/Home';
import BookService from './pages/BookService';
import Services from './pages/Services';
import Login from './pages/Login';
import BookingHistory from './pages/BookingHistory';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vehicle Service Booking
          </Typography>
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
          <Route path="/book" element={<BookService />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
