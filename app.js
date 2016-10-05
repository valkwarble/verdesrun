var express = require("express");//express dep
var bodyParser = require('body-parser');//req parser
var path = require("path");//path easyness
var fs = require("fs");

//var database = require("./database.js");//middle ware

var app = express();//make express object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));//define where files served to user are

var Database = function() {
  var that = Object.create(Database.prototype);

  // Create private variables.
  var TWEETFILENAME = "./tweets.json";
  var content;
  var db;
  function processFile() {
      json_flat = content; //  flat json
      db = JSON.parse(json_flat); //convert to an object

  };
  // REad the file liek in re$ci@^-1tion
  fs.readFile(TWEETFILENAME, function read(err, data) {
      if (err) {
          throw err;
      }
      content = data;
      //just grab the whole thing and make it an object
      processFile();          
  });

/**
   * Add a new tweet to the tweet tree
   * @param {String} username - user name of the user submitting tweet
   * @param {String} tweet - text of the message that will be tweeted
   * @param {String} tweedid - PseudoUniqueID (generate with a large hash function family)
   *  adds the tweet to the tweets table
   */
  that.addTweet = function(username, tweet, tweetid) {
    db['root']['tweets'].unshift({"tweetid":tweetid,"tweet":tweet,"username":username});
    return JSON.stringify(db);
  };

/**
   * Deletes a tweet with particular id from the tweets table
   * @param {String} tweetid - PseudoUniqueID of the tweet we want to delete 
   *  
   */
  that.deleteTweet = function(tweetid) {

    var newTweets = db['root']['tweets'].map(function(entry){ return (entry.tweetid == tweetid)? null:entry;}).filter(function(val) { return val !== null; });
    if (newTweets.length != 0){
      db['root']['tweets'].splice(0,db['root']['tweets'].length);
      newTweets.map(function(tweet){db['root']['tweets'].push(tweet)});
    }

    return JSON.stringify(db);
  };

  /**
   * Saves the mappings to the file.
   * @param {Function} callback - The function to execute after the saving is complete.
   */
  that.saveTweet = function(callback) {
    fs.writeFile(TWEETFILENAME, JSON.stringify(db), callback ? callback : function() {});
  };

  
 /**
   * get a table spefified by the get request.
   * @param {String} short - The short name.
   * @returns {String} The URL or undefined if there is no URL defined for the short name.
   */
  that.getRequest = function(getRequest) {
    return JSON.stringify({"table":db['root'][getRequest]});
  };
  Object.freeze(that);
  return that;
};

var database = Database();
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
