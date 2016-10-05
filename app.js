var express = require("express");//express dep
var bodyParser = require('body-parser');//req parser
var path = require("path");//path easyness
var database = require("./database.js");//middle ware

var app = express();//make express object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));//define where files served to user are

//add a new tweet to the database
app.post("/tweet", function(req, res) {
  short = database.addTweet(req.body.username.replace(/\+/g, ' '), req.body.tweet, req.body.tweetid);
  database.saveTweet(function() {
    res.json({"username": req.body.username.replace(/\+/g, ' '), "tweet": req.body.tweet, "tweetid": req.body.tweetid});
  });
});

//fufill get request for the data base
app.get("/database", function(req, res) {
  var getrequest = database.getRequest(req.query.get);
  res.send(getrequest);
});

//delete a tweet from the database
app.post("/delete", function(req, res) {
  var deleterequest = database.deleteTweet(req.body.tweetid);
  database.saveTweet(function(){});
  res.send(deleterequest);
});



app.listen(3000, function() {
  console.log("Listening on port 3000");
});
