const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips - return all trips.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean().exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Unable to retrieve trips:', err.message);
    return res.status(500).json({ message: 'Unable to retrieve trips.' });
  }
};

// GET: /api/trips/:tripCode - return one trip identified by its code.
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).lean().exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip '${req.params.tripCode}' not found.` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Unable to retrieve trip:', err.message);
    return res.status(500).json({ message: 'Unable to retrieve trip.' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
