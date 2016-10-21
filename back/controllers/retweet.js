var Tweet = require('../models/tweets');
var mongoose = require('mongoose');
/**
 * Constructs and returns the controller for the retweet API
 * used to create a duplicate tweet 
 * @returns- retweet api Controller object
 * @constructor
 */
module.exports = {
/**
	 * Handle Post response for retweet api
	 * create new tweet including retweet refference
	 * @param req - http request data passed by client including user credentials and tweet message string
	 * @param res - http response data passed to client
	 * @returns- 200 response & new tweet if ok 401 response if invalid
	 * @constructor
	 */
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

