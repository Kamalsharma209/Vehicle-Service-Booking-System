import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [carOptions, setCarOptions] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/cars.json')
      .then(res => res.json())
      .then(data => {
        const cars = data.filter(car => car && car.id && car.name).map(car => ({
          id: car.id,
          label: car.name,
          ...car
        }));
        setCarOptions(cars);
        setLoading(false);
        if (cars.length === 0) setError('No cars found in local data.');
      })
      .catch(() => {
        setError('Failed to fetch car data from local file.');
        setLoading(false);
      });
  }, []);

  const handleCarChange = (event) => {
    const value = event.target.value;
    setSelectedCar(value);
    const car = carOptions.find(c => c.id === value);
    if (car) {
      navigate(`/car/${encodeURIComponent(car.id)}`);
    }
  };

  return (
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
        <Box ml={2}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : error ? (
            <Alert severity="error" sx={{ minWidth: 200 }}>{error}</Alert>
          ) : (
            <Select
              value={selectedCar}
              onChange={handleCarChange}
              displayEmpty
              sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 200 }}
              size="small"
            >
              <MenuItem value="" disabled>Select Your Car</MenuItem>
              {carOptions.map((car) => (
                <MenuItem key={car.id} value={car.id}>{car.label}</MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 