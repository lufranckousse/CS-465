const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header required.' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'Valid Bearer token required.' });
  }
  try {
    req.auth = jwt.verify(parts[1], process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router.route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
