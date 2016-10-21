 var mongoose = require("mongoose");
 var ObjectId = mongoose.Schema.Types.ObjectId;
 /**
	 * User Schema
	 * 
	 * @param username - string representing login credentials
	 * @param password - string representing login credentials
	 * @param follows - array of User references
	 */
 var UserSchema = mongoose.Schema({
	username: String,
	password:String,
	follows: [{ type: ObjectId, ref: "User"}]
	
})



module.exports = mongoose.model("User", UserSchema);