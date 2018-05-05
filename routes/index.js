var express = require('express');
var router = express.Router();
var winston = require('winston');

var nodemailer = require('nodemailer');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

/* GET About us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* GET About us page. */
router
  .route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
  })
  .post(function(req, res, next) {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      // TODO: setup real gmail account
      // TODO: extract code into another file

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      });


      // setup email data with unicode symbols
      let mailOptions = {
        from: `${req.body.name} <${req.body.email}>`, // sender address
        to: 'admin@codester.com', // list of receivers
        subject: 'Message from Contact us Page', // Subject line
        html: `
          <h3>From: ${req.body.name} ~ ${req.body.email} </h3>

          <h4> Message </h4>
          ${req.body.message}
        ` // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return winston.error(error);
        }
        winston.info('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        winston.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // Show the thank you page
        res.render('thank', { title: 'Codesters' });
      });
    });
  });

module.exports = router;
