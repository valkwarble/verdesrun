var Tweet = require('../models/tweets');
var mongoose = require('mongoose');

/**
 * Constructs and returns the controller for the message api
 * used to get, delete and generate tweets
 * @returns- Message api Controller object
 * @constructor
 */
module.exports = {
	/**
	 * Handle delete response
	 * 
	 * @param req - http request data passed by client including tweet id to delete
	 * @param res - http response data passed to client
	 * @returns- 200 response & deleted mesage if ok 401 response if invalid
	 * @constructor
	 */
	delete: function(req, res){
		Tweet.remove({"_id":mongoose.Types.ObjectId(req.body.tweetid)}).exec(function(err){
			res.status(200).send("deleted");
		})

	},
	/**
	 * Handle Get response
	 * 
	 * @param req - http request data passed by client
	 * @param res - http response data passed to client
	 * @returns- 200 response & list of tweets if ok 401 response if invalid
	 * @constructor
	 */
	get: function(req, res){
		Tweet.find({}).populate('user', '-password').exec(function(err, tweets){
			res.json({'tweets':tweets});
		})

	},
	/**
	 * Handle Post response
	 * 
	 * @param req - http request data passed by client including user credentials and tweet message string
	 * @param res - http response data passed to client
	 * @returns- 200 response & new tweet if ok 401 response if invalid
	 * @constructor
	 */
	post: function(req, res) {
		Tweet.create({
			text: req.body.text,
			user: mongoose.Types.ObjectId(req.user)
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