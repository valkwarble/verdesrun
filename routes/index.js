var express = require('express');
var router = express.Router();
var database = require('../models/database');

var database = database();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.json({});
  
});

router.post("/tweet", function(req, res) {
  short = database.addTweet(req.body.username.replace(/\+/g, ' '), req.body.tweet, req.body.tweetid);
  database.saveTweet(function() {
    res.json({"username": req.body.username.replace(/\+/g, ' '), "tweet": req.body.tweet, "tweetid": req.body.tweetid});
  });
});

//fufill get request for the data base
router.get("/database", function(req, res) {
  var getrequest = database.getRequest(req.query.get);
  res.send(getrequest);
});

//delete a tweet from the database
router.post("/delete", function(req, res) {
  var deleterequest = database.deleteTweet(req.body.tweetid);
  database.saveTweet(function(){});
  res.send(deleterequest);
});

module.exports = router;

