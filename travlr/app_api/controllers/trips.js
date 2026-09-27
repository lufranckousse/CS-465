const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean().exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Unable to retrieve trips:', err.message);
    return res.status(500).json({ message: 'Unable to retrieve trips.' });
  }
};

module.exports = {
  tripsList
};
