const express = require('express');
const mongoose = require('mongoose');
const vehiclesRouter = require('./routes/vehicles');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vehicle_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Vehicle API routes
app.use('/api/vehicles', vehiclesRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
}); 