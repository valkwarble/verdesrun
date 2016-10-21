var Tweet = require('../models/tweets');
var mongoose = require('mongoose');

module.exports = {
	delete: function(req, res){
		Tweet.remove({"_id":mongoose.Types.ObjectId(req.body.tweetid)}).exec(function(err){
			res.status(200).send("deleted");
		})

	},
	get: function(req, res){
		Tweet.find({}).populate('user', '-password').exec(function(err, tweets){
			res.json({'tweets':tweets});
		})

	},

	post: function(req, res) {
		Tweet.create({
			text: req.body.text,
			user: mongoose.Types.ObjectId(req.user)

			//mentions: getMentionUserReferences(req.body.text),
			//hashtags: getHashtags(req.body.text),
			//author: getUserReference(req.body.userid)
			}, 
	    function(err, record) {
	      if (err) {
	        res.json({
	          'success': false, 
	          'message': err.message
	        });
	      }
	      res.json({
	        'success': true, 
	        'tweet': record
	      });
	  });
	}
}