/* GET travel view using the REST API instead of direct database access. */
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      return res.status(response.status).send(`Unable to retrieve trips (HTTP ${response.status}).`);
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).send('API response was not a valid collection of trips.');
    }

    if (trips.length === 0) {
      return res.status(404).send('No trips were found.');
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    console.error('Unable to render travel page:', err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = {
  travel
};
