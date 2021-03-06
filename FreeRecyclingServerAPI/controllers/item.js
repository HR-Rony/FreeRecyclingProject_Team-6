'use strict';
var path = require('path');
var Item = require(path.join(global.AppRoot, 'model/item'));
var multer = require('multer');

function separateQuery(query) {
	var copyQuery;
	var queryObj = {};
	console.log('Query ===>');
	console.log(query);
	try{
		copyQuery = JSON.parse(query);
	} 
	catch(e) {
		console.log(e);
		copyQuery = query;
	}
	if(copyQuery) {
		queryObj.limit = copyQuery.limit;
		queryObj.sort = copyQuery.sort;
		queryObj.fields = copyQuery.field;
		queryObj.skip = copyQuery.skip;
		delete copyQuery.limit;
		delete copyQuery.skip;
		delete copyQuery.field;
		delete copyQuery.sort;
		queryObj.query = copyQuery;
	}
	return queryObj;
}

module.exports = {
	
	uploading : multer({
		onFileSizeLimit: function (file) {
            res.json({
                message: "File size is too large!! :(",
                status: MARankings.Enums.Status.FILE_TOO_LARGE
            });
        },
		storage:  multer.diskStorage({
			destination: function(req, file, callback) {
				callback(null, './public/images')
			},
			filename: function(req, file, callback) {
				callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
			}
		}),
  		limits: {fileSize: 2000000, files:1},
	}).single('upl'),
		
	save: function (req, res, next) {
		let id = req.body.id || req.params.id;
		let doc = req.body;
		if(id) {
			doc.id = id;
		}
		let item = new Item(doc);
		item.validate().then(function(){
			return item.save(doc);
		})
		.then(function(data) {
			res.json({
				success: 1,
				data: data
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	
	get: function(req, res, next) {
		
		var query = separateQuery(req.query.query);
		console.log(query);
		Item.find(query.query)
			.skip(query.skip)
			.limit(query.limit)
			.sort(query.sort)
			.select(query.fields)
		.then(function(data) {
			res.json({
				success:1,
				data: data
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	
	postUpload:function(req, res,next){
		console.log(req.body);
		let id = req.body.id;
		let imgName=req.file.fileName;
		if(!id) {
			return res.status(404).json({
				success: 10,
				error: new Error('Item is not added.  :(')
			});
		}

		Item.findOneAndUpdate({ _id: id }, { img: imgName})
		.then(function(data){
				res.json({
				success: 1,
				data: data._orignal
			});
		}).catch(function(err){
			return next(err);
		});		
	},
	
	getById: function (req, res, next) {
		let id = req.params.id || req.query.id;
		Item.findOne({_id: id})
		.then(function(data) {
			res.json({
				success: 1,
				data: data
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	
	delete: function(req, res, next) {
		let id = req.body.id || req.params.id || req.query.id;
		console.log("item id===>"+id);
		if(!id) {
			return res.status(404).json({
				success: 0,
				error: new Error('There is no item :(')
			});
		}
		Item.remove({id: id})
		.then(function(data) {
			res.json({
				status: 1,
				data: data
			});
		})
		.catch(function(err) {
			return next(err);
		});
	}};