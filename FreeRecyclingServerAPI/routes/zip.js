'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
var zipCtrl = require(path.join(global.AppRoot, 'controllers/zip'));

module.exports = function () {
    router.get('/getStates', zipCtrl.getStates);
    router.get('/getCities/:state', zipCtrl.getCities);
    return router;
};
