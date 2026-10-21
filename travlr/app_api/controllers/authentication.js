const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const existing = await User.findOne({ email: req.body.email.toLowerCase() }).exec();
    if (existing) return res.status(409).json({ message: 'Email is already registered.' });
    const user = new User({ name: req.body.name, email: req.body.email });
    user.setPassword(req.body.password);
    await user.save();
    return res.status(200).json({ token: user.generateJWT() });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json(info || { message: 'Authentication failed.' });
    return res.status(200).json({ token: user.generateJWT() });
  })(req, res);
};

module.exports = { register, login };
