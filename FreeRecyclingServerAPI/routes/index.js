var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json(['item1', 'item2']);
 });

module.exports = router;
