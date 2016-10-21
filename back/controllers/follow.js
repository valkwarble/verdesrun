var User = require('../models/users');
var mongoose = require('mongoose');
/**
 * Constructs and returns the controller for the follow API
 * 
 * @returns- Follow Controller object
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
	post: function(req, res){
		var that = req;

		User.findOne({username:req.body.username}, function(err, validUser){	
			if(validUser == null){
				return res.status(304).send("invalid username");
			}
			User.findOne({ _id: req.user }, function(err, userlogin){
				var follows = userlogin.follows.map(function(x){return x.toString()}).includes(validUser._id.toString());
				if (!follows){
					User.update(
					   { _id: req.user },
					   {$push: {'follows': mongoose.Types.ObjectId(validUser._id)}}
					, function(err, count, status){
						res.status(200).send(validUser);
					})
				}
				else{
					res.status(304).send("already following");
				}
			})
			
			
		})//FIND END
		
	}
}

