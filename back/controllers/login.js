var User = require('../models/users');
var Token = require('jwt-simple');
var moment = require('moment');
/**
 * Constructs and returns the controller for the login API
 * used to query database for valid users
 * @returns- login Controller object
 * @constructor
 */
module.exports = {
	/**
	 * Handle Post response
	 * 
	 * @param req - http request data passed by client including user credentials
	 * @param res - http response data passed to client including valid user token
	 * @returns- 200 response & user token if ok, 401 response if invalid
	 * @constructor
	 */
	post: function(req, res){
		var that = req;
		User.findOne({username:req.body.username}, function(err, validUser){	
			if(validUser == null){
				return res.status(401).send("invalid username");
			}
			if(validUser.password == that.body.password){
				res.status(200).send({auth: token(validUser)});
			}
			else{
				return res.status(401).send("invalid password");
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