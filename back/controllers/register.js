var User = require('../models/users');
var Token = require('jwt-simple');
var moment = require('moment');
module.exports = {
	post: function(req, res){
		User.findOne({username:req.body.username}, function(err, validUser){
			
			if(validUser){
				return res.status(200).send({auth:{error: "Attempted to Create Account Over Existing User"}});
			}
			else{
			User.create(req.body, 
			    function(err, record) {
					if (err) {
						console.log(err);
						res.json({
						  'success': false, 
						  'message': err.message
						});
					}
					res.status(200).send({auth: token(record)});//send back token with user id
			});//CREATE END	
			}//IF END
		})//FIND END
		
	}
}

function token (user){

	var payload = {
		uid: user._id,
		name: user.username,
		iat: moment().unix(),
		exp: moment().add(14,'days').unix()
	}
	//return Token.encode(payload,'password');
	return payload;
}