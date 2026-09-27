const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
require('./travlr');
const Trip = mongoose.model('trips');

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    await Trip.deleteMany({});
    const insertedTrips = await Trip.insertMany(trips);
    console.log(`Successfully loaded ${insertedTrips.length} trips into MongoDB.`);
  } catch (err) {
    console.error('Database seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
