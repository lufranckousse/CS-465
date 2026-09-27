/* GET travel view */
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const travel = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).lean().exec();
    res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    console.error('Unable to render travel page:', err.message);
    next(err);
  }
};

module.exports = {
  travel
};
