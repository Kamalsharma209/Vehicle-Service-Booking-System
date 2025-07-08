# VBD Backend API

A comprehensive Node.js/Express backend for the Vehicle Booking & Details (VBD) application.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 🚗 **Vehicle Management** - CRUD operations for user vehicles
- 🔧 **Service Management** - Vehicle service catalog with categories
- 📅 **Booking System** - Complete booking lifecycle management
- 👥 **User Management** - User profiles and admin controls
- 🛡️ **Security** - Input validation, CORS, Helmet protection
- 📊 **Database** - MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors
- **Logging**: morgan

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/vbd_database
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   - Local: Start MongoDB service
   - Atlas: Use your MongoDB Atlas connection string

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)
- `GET /api/services/categories` - Get service categories

### Vehicles
- `GET /api/vehicles` - Get user vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status (Admin)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/review` - Add review to booking
- `GET /api/bookings/admin/all` - Get all bookings (Admin)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

### Health Check
- `GET /api/health` - API health status

## Database Models

### User
- name, email, password, phone
- address (street, city, state, zipCode)
- role (user/admin), isActive
- timestamps

### Service
- name, description, category
- price, duration, image
- features, requirements, warranty
- isActive, timestamps

### Vehicle
- name, brand, model, year
- registrationNumber, color
- fuelType, transmission
- engineCapacity, mileage
- image, description
- isActive, timestamps

### Booking
- user, service, vehicle (references)
- scheduledDate, scheduledTime
- status, totalAmount, paymentStatus
- paymentMethod, specialInstructions
- technicianNotes, completionNotes
- rating, review
- cancellationReason, cancelledBy
- timestamps

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

### Project Structure
```
backend/
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Service.js
│   ├── Booking.js
│   └── Vehicle.js
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── bookings.js
│   ├── vehicles.js
│   └── users.js
├── server.js
├── package.json
└── README.md
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS protection
- Helmet security headers
- Rate limiting (can be added)
- SQL injection protection (MongoDB)
- XSS protection

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas
4. Set up environment variables
5. Use a process manager like PM2
6. Set up SSL/TLS certificates
7. Configure proper CORS origins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License 