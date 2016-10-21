var User = require('../models/users');
var Tweet = require('../models/tweets');
var mongoose = require('mongoose');
module.exports = {


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

