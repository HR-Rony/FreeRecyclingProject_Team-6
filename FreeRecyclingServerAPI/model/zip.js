'use strict';
var path = require('path');

var db = require(path.join(global.AppRoot, 'model/db.js'));
var Schema = db.Schema;

var myZipSchema = new Schema({
    city: {type: String, },
    loc: { type: [Number], },
    pop: {  type: Number,  },
    state: {type: String, }
});

module.exports = db.model('zip', myZipSchema);
