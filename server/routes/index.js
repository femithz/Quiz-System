var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome to My Quiz-System for GetDev Developed By Femithz');
});

module.exports = router;
