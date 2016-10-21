var User = require('../models/users');
var Token = require('jwt-simple');
var moment = require('moment');
/**
 * Constructs and returns the controller for the register API
 * used register new users in User table
 * @returns- FollowerMessages Controller object
 * @constructor
 */
module.exports = {
	/**
	 * Handle Post response for register api 
	 * generate new user if no conflict exists
	 * @param req - http request data passed by client including username and desired password
	 * @param res - http response data passed to client
	 * @returns- 200 response & auth token if ok or error object if invalid
	 * @constructor
	 */
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
/**
 * Generate token from valid user
 * 
 * @param user - valid user to generate token for
 * @returns- user token with credentials and expiration
 * @constructor
 */
function token (user){
	var payload = {
		uid: user._id,
		name: user.username,
		iat: moment().unix(),
		exp: moment().add(14,'days').unix()
	}
	//return Token.encode(payload,'password');
	//going old skool cookies instead of JWT token (so unsafe)
	return payload;
}