var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

/* GET About us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* GET About us page. */
router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
  })
  .post(function(req, res, next) {
    res.render('thank', { title: 'Codesters' })
  });

module.exports = router;
