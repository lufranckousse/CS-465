const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: [true, 'Trip code is required'], unique: true, index: true, trim: true },
  name: { type: String, required: [true, 'Trip name is required'], trim: true },
  length: { type: String, default: '' },
  start: { type: Date, default: null },
  resort: { type: String, default: '' },
  perPerson: { type: Number, default: 0 },
  image: { type: String, required: [true, 'Trip image is required'], trim: true },
  description: { type: String, required: [true, 'Trip description is required'], trim: true }
}, { collection: 'trips' });

mongoose.model('trips', tripSchema);
