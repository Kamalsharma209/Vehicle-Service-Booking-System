import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  DirectionsCar as CarIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Since we don't have a direct endpoint for all vehicles, we'll simulate data
      // In a real app, you'd create an admin endpoint for this
      const mockVehicles = [
        {
          _id: '1',
          name: 'Honda City',
          brand: 'Honda',
          model: 'City',
          year: 2020,
          registrationNumber: 'MH01AB1234',
          color: 'White',
          fuelType: 'petrol',
          transmission: 'automatic',
          engineCapacity: 1500,
          mileage: 25000,
          image: '/template-1.jpg',
          user: { name: 'John Doe', email: 'john@example.com' },
          isActive: true,
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          name: 'Maruti Swift',
          brand: 'Maruti',
          model: 'Swift',
          year: 2021,
          registrationNumber: 'MH02CD5678',
          color: 'Red',
          fuelType: 'petrol',
          transmission: 'manual',
          engineCapacity: 1200,
          mileage: 15000,
          image: '/template-2.jpg',
          user: { name: 'Jane Smith', email: 'jane@example.com' },
          isActive: true,
          createdAt: '2024-02-20'
        },
        {
          _id: '3',
          name: 'Hyundai i20',
          brand: 'Hyundai',
          model: 'i20',
          year: 2019,
          registrationNumber: 'MH03EF9012',
          color: 'Blue',
          fuelType: 'diesel',
          transmission: 'automatic',
          engineCapacity: 1400,
          mileage: 35000,
          image: '/template-3.jpg',
          user: { name: 'Mike Johnson', email: 'mike@example.com' },
          isActive: true,
          createdAt: '2024-03-10'
        }
      ];
      setVehicles(mockVehicles);
    } catch (error) {
      setError('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFuelTypeColor = (fuelType) => {
    switch (fuelType) {
      case 'petrol': return 'primary';
      case 'diesel': return 'secondary';
      case 'electric': return 'success';
      case 'hybrid': return 'info';
      default: return 'default';
    }
  };

  const getTransmissionColor = (transmission) => {
    switch (transmission) {
      case 'automatic': return 'success';
      case 'manual': return 'warning';
      case 'cvt': return 'info';
      default: return 'default';
    }
  };

  if (loading && vehicles.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Vehicles Management</Typography>
        <TextField
          size="small"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Vehicle Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Vehicles
              </Typography>
              <Typography variant="h4">
                {vehicles.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Vehicles
              </Typography>
              <Typography variant="h4" color="success.main">
                {vehicles.filter(v => v.isActive).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Petrol Vehicles
              </Typography>
              <Typography variant="h4" color="primary.main">
                {vehicles.filter(v => v.fuelType === 'petrol').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Diesel Vehicles
              </Typography>
              <Typography variant="h4" color="secondary.main">
                {vehicles.filter(v => v.fuelType === 'diesel').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Registration</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Transmission</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <CardMedia
                      component="img"
                      image={vehicle.image}
                      alt={vehicle.name}
                      sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {vehicle.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {vehicle.brand} {vehicle.model} ({vehicle.year})
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {vehicle.user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {vehicle.user.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {vehicle.registrationNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.fuelType}
                    color={getFuelTypeColor(vehicle.fuelType)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.transmission}
                    color={getTransmissionColor(vehicle.transmission)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {vehicle.mileage.toLocaleString()} km
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.isActive ? 'Active' : 'Inactive'}
                    color={vehicle.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setOpenDialog(true);
                    }}
                    color="primary"
                  >
                    <ViewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Vehicle Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Vehicle Details
        </DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {selectedVehicle.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.year})
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Owner Information</Typography>
                  <Typography variant="body2">Name: {selectedVehicle.user.name}</Typography>
                  <Typography variant="body2">Email: {selectedVehicle.user.email}</Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Vehicle Specifications</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Registration: {selectedVehicle.registrationNumber}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Color: {selectedVehicle.color}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Fuel Type: {selectedVehicle.fuelType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Transmission: {selectedVehicle.transmission}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Engine: {selectedVehicle.engineCapacity}cc</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Mileage: {selectedVehicle.mileage.toLocaleString()} km</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VehiclesManagement; 