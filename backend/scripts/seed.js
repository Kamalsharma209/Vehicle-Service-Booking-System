require('dotenv').config();
const connectDB = require('../config/database');
const seedData = require('../data/seedData');

const runSeed = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Run seed data
    await seedData();
    
    console.log('✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed(); 