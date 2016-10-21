 var mongoose = require("mongoose");
 var ObjectId = mongoose.Schema.Types.ObjectId;
 var UserSchema = mongoose.Schema({
	username: String,
	password:String,
	follows: [{ type: ObjectId, ref: "User"}]
	
})



module.exports = mongoose.model("User", UserSchema);