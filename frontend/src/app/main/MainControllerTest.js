module.exports =  class MainController{
	constructor ($http, $scope, $cookies, $window) {
    'ngInject';
      this.$http = $http;
      this.$scope =$scope;
      this.$cookies =$cookies;
      this.$window = $window;
      this.getMessages();
  }
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

	postMessage(){
		var that = this;
		$.post("/api/message", {
			"text": this.message
		}, function() {
			that.getMessages();
		});	
	}
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
	follow(user){
		$.post("/api/follow", {
			"username": user
		}, function() {
		});	
	}
	retweet(tweet){
		var that = this;
		$.post("/api/retweet", {
			text: tweet.text,
			retweet: tweet.user.username
		}, function() {
			that.getMessages();
		});	
	}
	getFollowerMessages(){
		var that = this;

		$.get("/api/followermessages", function(){
		}).done(function(data) {
			that.followermessages = data.tweets.reverse()	;
			that.$scope.$apply();
		});// in the call back this points to something else need to keep vm controller in scopem
	
	}
	
	deletecheck(){	
		return this.$cookies.get('username');				
	}

}

