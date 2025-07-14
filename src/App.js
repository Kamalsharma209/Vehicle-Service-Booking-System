import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import BookService from './pages/BookService';
import Services from './pages/Services';
import Login from './pages/Login';
import BookingHistory from './pages/BookingHistory';
import Footer from './pages/Footer';
import ServiceDetail from './pages/ServiceDetail';
import Navbar from './pages/Navbar';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Register from './pages/Register';
import './GoMechanicLogo.css';

function CarDetails() {
  const { carId } = useParams();
  const [car, setCar] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/cars.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((c) => c.id === carId);
        setCar(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [carId]);

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}><h2>Loading...</h2></div>;
  if (!car) return <div style={{padding: 40, textAlign: 'center'}}><h2>Car not found</h2></div>;

  return (
    <div style={{padding: 40, textAlign: 'center'}}>
      <h2>{car.name}</h2>
      <img src={car.image} alt={car.name} style={{maxWidth: 400, width: '100%', borderRadius: 12, marginBottom: 20}} />
      <p><b>Brand:</b> {car.brand}</p>
      <p><b>Year:</b> {car.year}</p>
      <p>{car.description}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceName" element={<ServiceDetail />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
