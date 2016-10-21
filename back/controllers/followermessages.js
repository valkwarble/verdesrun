var User = require('../models/users');
var Tweet = require('../models/tweets');
var mongoose = require('mongoose');
/**
 * Constructs and returns the controller for the followmessages API
 * 
 * @returns- FollowerMessages Controller object
 * @constructor
 */
module.exports = {
	/**
	 * Handle Post response
	 * 
	 * @param req - http request data passed by client
	 * @param res - http response data passed to client
	 * @returns- 200 response if ok 304 response if invalid
	 * @constructor
	 */
	get: function(req, res){
		User.findOne({_id:req.user}, function(err, validUser){	
			if(validUser == null){
				return res.status(401).send("invalid username");
			}	
			Tweet.find({
				
				  
				      user: { $in: validUser.follows }
				   
				
			}).populate('user', '-password').exec(function(err, tweets){
				res.json({'tweets':tweets});
			})		
			
		})//FIND END
		
			
	}
	
		
	
}

