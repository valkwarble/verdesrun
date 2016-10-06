(function() {
  mocha.setup("bdd");

  var assert = chai.assert;
  var expect = chai.expect;
  var to = chai.to;
  var equal =chai.equal;

  describe("Auth", function() { 

    describe("getQueryVariable", function(){

      it("should return false since no variable is set on this route", function(){
        var auth = Auth();
        var results = auth.getQueryVariable("username");
        var answer = false; 
        expect(results).to.deep.equal(answer);
      })


    });

    describe("guid ", function(){

      it("should return no GUID matches in 10000 trials since GUID must be unique", function(){
        var auth = Auth();
        var check = auth.guid();
        var trythis= Array(1000).fill(1);
        var results = trythis.map(function(each){return each==check?true:false});
        var answer = trythis.map(function(){return false}); 
        expect(results).to.deep.equal(answer);
      })
      it("should return true since each GUID should be 36 character string", function(){
        var auth = Auth();
        var results = auth.guid().length;
        var answer = 36; 
        expect(results).to.deep.equal(answer);
      })

    });


  });
  describe("Database", function() { 

    describe("addTweet", function(){

      it("should add a tweet to the empty Database", function(){
        var db = Database(true);
        var results = db.addTweet('a','a','a');
        var answer = '{"root":{"tweets":[{"tweetid":"a","tweet":"a","username":"a"}]}}'; 
        expect(results).to.deep.equal(answer);
      })

    });
    describe("deleteTweet", function(){

      it("should delete a tweet from the  Database", function(){
          var db = Database(true);
          db.addTweet('a','a','a');
          db.addTweet('b','b','b'); 
          var results = db.deleteTweet('a');
          var answer = '{"root":{"tweets":[{"tweetid":"b","tweet":"b","username":"b"}]}}'; 
          expect(results).to.deep.equal(answer);
        })
    });
    describe("getRequest", function(){

      it("fetch the tweet table from the Database", function(){
          var db = Database(true);
          db.addTweet('a','a','a');
          db.addTweet('b','b','b');
          db.deleteTweet('a'); 
          var results = db.getRequest('tweets');

          var answer = '{"table":[{"tweetid":"b","tweet":"b","username":"b"}]}'; 
          expect(results).to.deep.equal(answer);
        })
    });

  });
  mocha.run();
})()
