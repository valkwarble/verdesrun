/**
 * Constructs and returns the controller for / and /auth
 * used to send ajax requests to server side to populate views
 * @returns- MainController class 
 * @constructor
 */
export class MainController{
	constructor ($http, $scope, $cookies, $window) {
    'ngInject';
      this.$http = $http;
      this.$scope =$scope;
      this.$cookies =$cookies;
      this.$window = $window;
      this.getMessages();
  }
  /**
	 * Get all of the tweets in the data baseif the user is logged in
	 * and trigger the view render using message api redirect if not logged in 
	 * @returns- 200 response & list of tweets if ok 401 response if invalid
	 */
   getMessages(){
		var that = this;

		$.get("/api/message", function(){
		}).done(function(data) {
			if(that.$cookies.get('username')){
				that.messages = data.tweets.reverse();
				that.getFollowerMessages()
				that.$scope.$apply();
			}else{
				that.$window.location.href = '/#/auth';
			}
		}).fail(function() {
		});// in the call back this points to something else need to keep vm controller in scopem
	
	}
/**
	 * Post a new Tweet with specified text using ajax call to message api
	 * loads new messages on success
	 * @param this.message - String representing new post
	 * @returns- 200 response & new record or error object
	 * @constructor
	 */
	postMessage(){
		var that = this;
		$.post("/api/message", {
			"text": this.message
		}, function() {
			that.getMessages();
		});	
	}
	/**
	 * Delete a message from the data base, reload tweets if success full
	 *  using the message api
	 * @param tweetid - if of the tweet we want to delete
	 * @returns- 200 response & number of records modified or erroe object.
	 * @constructor
	 */
	deletemessage(tweetid){
		var that = this;
		var contentType = "application/x-www-form-urlencoded; charset=utf-8";
		$.ajax({
		type: "DELETE",
		url: "api/message",
		data: {"tweetid": tweetid},
		contentType: contentType,
		success: function(){
			that.getMessages();
		},
		error:function(){ 
		}
		});
	}
	/**
	 * Add a user to the follows list using follow api
	 * 
	 * @param user - user we would like to add
	 */
	follow(user){
		$.post("/api/follow", {
			"username": user
		}, function() {
		});	
	}
	/**
	 * Tweet a post by another user using retweet api
	 * load messages on success 
	 * @param tweet - tweet object
	 * @returns- 200 response & list of tweets if ok 401 response if invalid
	 * @constructor
	 */
	retweet(tweet){
		var that = this;
		$.post("/api/retweet", {
			text: tweet.text,
			retweet: tweet.user.username
		}, function() {
			that.getMessages();
		});	
	}
	/**
	 * Get all tweets of people that user follows 
	 * using followermessages api, trigger view render on success
	 * @returns- 200 response & list of tweets if ok 401 response if invalid
	 * @constructor
	 */
	getFollowerMessages(){
		var that = this;

		$.get("/api/followermessages", function(){
		}).done(function(data) {
			that.followermessages = data.tweets.reverse()	;
			that.$scope.$apply();
		});// in the call back this points to something else need to keep vm controller in scopem
	
	}
	/**
	 * Helper for deletemessage to grab current user name from 
	 * cookies
	 * @returns- username cookie object
	 * @constructor
	 */
	deletecheck(){	
		return this.$cookies.get('username');				
	}

}

