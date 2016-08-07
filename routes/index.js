var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Analytics | Dashboard',backgroundImage:'background-image:url("images/back.jpg");background-repeat:no-repeat;background-size:100% 100%;'});
});
module.exports = router;
