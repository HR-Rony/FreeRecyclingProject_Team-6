'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
var ItemCtrl = require(path.join(global.AppRoot, 'controllers/item'));

module.exports = function(authCheck) {
	router.get('/:id', ItemCtrl.getById);
	router.put('/:id', ItemCtrl.save);
	router.delete('/:id', ItemCtrl.delete);
	router.get('/', ItemCtrl.get);
	router.post('/', ItemCtrl.save);	
	router.post('/upload',ItemCtrl.uploading, ItemCtrl.postUpload);
	return router;
};
