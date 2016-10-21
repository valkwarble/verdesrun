var Tweet = require('../models/tweets');
var mongoose = require('mongoose');
module.exports = {
	post: function(req, res){
		var that = req;
		Tweet.create({
			text: req.body.text,
			user: mongoose.Types.ObjectId(req.user),
			retweet: req.body.retweet
		}, 
	    function(err, record) {
			if (err) {
				res.json({
				  'success': false, 
				  'message': err.message
				});
			}
			res.json({
				'success': true, 
				'tweet': record
			});
		});
		
		
	}
}

