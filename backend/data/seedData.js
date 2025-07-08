const Service = require('../models/Service');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedServices = [
  {
    name: 'Oil Change',
    description: 'Complete engine oil change with high-quality synthetic oil. Includes oil filter replacement and multi-point inspection.',
    category: 'maintenance',
    price: 2999,
    duration: 60,
    image: '/oil change.jpg',
    features: [
      'Synthetic oil replacement',
      'Oil filter change',
      'Multi-point inspection',
      'Free top-up fluids'
    ],
    requirements: [
      'Vehicle should be cool',
      'Bring service history if available'
    ],
    warranty: 30
  },
  {
    name: 'Brake Inspection',
    description: 'Comprehensive brake system inspection including brake pads, rotors, and brake fluid check.',
    category: 'inspection',
    price: 1499,
    duration: 45,
    image: '/brake inspection.jpg',
    features: [
      'Brake pad inspection',
      'Rotor condition check',
      'Brake fluid level check',
      'Brake system test'
    ],
    requirements: [
      'Vehicle should be stationary',
      'Parking brake should be engaged'
    ],
    warranty: 0
  },
  {
    name: 'AC Service and Repair',
    description: 'Complete air conditioning system service including refrigerant check, filter cleaning, and leak detection.',
    category: 'repair',
    price: 3999,
    duration: 90,
    image: '/ac service and repair.jpg',
    features: [
      'Refrigerant level check',
      'AC filter cleaning',
      'Leak detection',
      'Performance testing'
    ],
    requirements: [
      'Vehicle should be in shade',
      'AC should be turned off'
    ],
    warranty: 90
  },
  {
    name: 'Battery Replacement',
    description: 'Professional battery replacement with testing and installation. Includes old battery disposal.',
    category: 'repair',
    price: 4999,
    duration: 30,
    image: '/batterty replace.jpg',
    features: [
      'Battery testing',
      'New battery installation',
      'Terminal cleaning',
      'Old battery disposal'
    ],
    requirements: [
      'Vehicle should be turned off',
      'Bring old battery if available'
    ],
    warranty: 365
  },
  {
    name: 'Car Cleaning',
    description: 'Professional interior and exterior car cleaning with premium products and attention to detail.',
    category: 'cleaning',
    price: 1999,
    duration: 120,
    image: '/car cleaning.jpg',
    features: [
      'Exterior wash and wax',
      'Interior vacuum and cleaning',
      'Dashboard and console cleaning',
      'Tire and wheel cleaning'
    ],
    requirements: [
      'Remove personal items',
      'Vehicle should be unlocked'
    ],
    warranty: 0
  },
  {
    name: 'Car Inspection',
    description: 'Comprehensive vehicle inspection covering all major systems and components.',
    category: 'inspection',
    price: 2499,
    duration: 75,
    image: '/car inspection.jpg',
    features: [
      'Engine inspection',
      'Electrical system check',
      'Suspension and steering test',
      'Safety systems verification'
    ],
    requirements: [
      'Vehicle should be clean',
      'Service history if available'
    ],
    warranty: 0
  },
  {
    name: 'Clutch and Body Part',
    description: 'Clutch system repair and body part replacement with genuine parts and professional installation.',
    category: 'repair',
    price: 8999,
    duration: 180,
    image: '/clutch and body part.jpg',
    features: [
      'Clutch system repair',
      'Body part replacement',
      'Genuine parts used',
      'Quality assurance'
    ],
    requirements: [
      'Vehicle should be stationary',
      'Detailed issue description'
    ],
    warranty: 180
  },
  {
    name: 'Suspension Repair',
    description: 'Complete suspension system repair including shock absorbers, springs, and alignment.',
    category: 'repair',
    price: 6999,
    duration: 150,
    image: '/suspension repair.jpg',
    features: [
      'Shock absorber replacement',
      'Spring inspection',
      'Wheel alignment',
      'Suspension testing'
    ],
    requirements: [
      'Vehicle should be on level ground',
      'Previous inspection report if available'
    ],
    warranty: 180
  },
  {
    name: 'Tire Rotation',
    description: 'Professional tire rotation service to ensure even wear and extend tire life.',
    category: 'maintenance',
    price: 999,
    duration: 30,
    image: '/tire rotation.jpg',
    features: [
      'Tire rotation',
      'Tire pressure check',
      'Tire condition inspection',
      'Wheel balancing check'
    ],
    requirements: [
      'Vehicle should be stationary',
      'All tires should be same size'
    ],
    warranty: 0
  }
];

const seedAdminUser = {
  name: 'Admin User',
  email: 'admin@vbd.com',
  password: 'admin123',
  phone: '9876543210',
  role: 'admin',
  address: {
    street: '123 Admin Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001'
  }
};

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Service.deleteMany({});
    console.log('✅ Cleared existing services');

    // Seed services
    await Service.insertMany(seedServices);
    console.log('✅ Seeded services data');

    // Check if admin user exists
    const adminExists = await User.findOne({ email: seedAdminUser.email });
    if (!adminExists) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      seedAdminUser.password = await bcrypt.hash(seedAdminUser.password, salt);
      
      // Create admin user
      await User.create(seedAdminUser);
      console.log('✅ Created admin user');
      console.log('📧 Admin Email: admin@vbd.com');
      console.log('🔑 Admin Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Total services created:', seedServices.length);
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

module.exports = seedData; 