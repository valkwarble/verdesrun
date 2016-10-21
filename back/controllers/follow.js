var User = require('../models/users');
var mongoose = require('mongoose');
module.exports = {
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

