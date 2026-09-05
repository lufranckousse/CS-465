var express = require('express');
var router = express.Router();

/* GET home page fallback. Normally public/index.html is served first. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travlr Getaways' });
});

module.exports = router;
