 var mongoose = require("mongoose");
 var ObjectId = mongoose.Schema.Types.ObjectId;
 /**
	 * Tweet Schema
	 * 
	 * @param text - string representing tweeted message
	 * @param user - object of User reference
	 * @param retweet - string of tweet retweeter
	 */
 var TweetSchema = mongoose.Schema({
	text: String , 
	user: { type: ObjectId, ref: "User"},
	retweet: String
	
})



module.exports = mongoose.model("Tweets", TweetSchema);