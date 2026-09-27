const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

const connect = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`Mongoose connected to ${dbURI}`);
  } catch (err) {
    console.error('Mongoose initial connection error:', err.message);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
  } finally {
    process.exit(0);
  }
};

process.once('SIGINT', () => gracefulShutdown('app termination'));
process.once('SIGTERM', () => gracefulShutdown('app termination'));

connect();

require('./travlr');

module.exports = mongoose.connection;
