const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Trip image is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Trip description is required'],
    trim: true
  }
}, {
  collection: 'trips'
});

mongoose.model('trips', tripSchema);
