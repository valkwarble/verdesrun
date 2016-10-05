// Import file system utilities
var fs = require("fs");

/**
 * Maintains a db of tweets
 */
var Database = function() {
  var that = Object.create(Database.prototype);

  // Create private variables.
  var TWEETFILENAME = "./tweets.json";
  var content;
  var db;
  function processFile() {
      if(((typeof content) != "string")){
        json_flat = '{"root":{"tweets":[]}}';
      }else{
        json_flat = content;
      }
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
    db['root']['tweets'].splice(0,db['root']['tweets'].length);
    if (newTweets.length != 0){
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

module.exports = Database();
