 var mongoose = require("mongoose");
 var ObjectId = mongoose.Schema.Types.ObjectId;
 var TweetSchema = mongoose.Schema({
	text: String , 
	user: { type: ObjectId, ref: "User"},
	retweet: String
	
})



module.exports = mongoose.model("Tweets", TweetSchema);