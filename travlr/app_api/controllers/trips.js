const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try { return res.status(200).json(await Trip.find({}).lean().exec()); }
  catch (err) { return res.status(500).json({ message: err.message }); }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).lean().exec();
    if (!trip) return res.status(404).json({ message: `Trip '${req.params.tripCode}' not found.` });
    return res.status(200).json(trip);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(err.code === 11000 ? 409 : 400).json({ message: err.message });
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode }, req.body,
      { new: true, runValidators: true }
    ).lean().exec();
    if (!trip) return res.status(404).json({ message: `Trip '${req.params.tripCode}' not found.` });
    return res.status(200).json(trip);
  } catch (err) { return res.status(400).json({ message: err.message }); }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).lean().exec();
    if (!trip) return res.status(404).json({ message: `Trip '${req.params.tripCode}' not found.` });
    return res.status(200).json({ message: `Trip '${req.params.tripCode}' deleted.`, trip });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };
