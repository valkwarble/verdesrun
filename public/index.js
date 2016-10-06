/**
 * Constructs and returns the controller for the game of life board. 
 * This class handles the user inferface and owns the Board and View to prevent rep exposure to client
 * Initiates View and event handlers for UX and appends prerendered HTML to target div
 * 
 * @param Auth - authentication library
 * @param View - View class to generate
 * @returns- Controller object
 * @constructor
 */
var Controller = function (Auth, View){

	var that 

	var auth= Auth();
	var view= View();

	$(document).on("click", "#createTweet", function() {
		var username = auth.getQueryVariable("username");
		if(username== false){
			alert('please log in')
			return;
		}
		else if( $("#tweet").val().length ==0 ){
			alert('empty field warning, please write something')
			return;
		}
		else{
			$.post("/tweet", {
			    "username": username, 
			    "tweet": $("#tweet").val(),
			    "tweetid": auth.guid()
			  }, function(data) {
			  	view.renderTweets();  
			 
			});	
		}
		
	});

	$(document).on("click", ".delete", function() {
		
		$.post("/delete", {
			    "tweetid": $(this).attr('id')
			  }, function(data) {
			  	view.renderTweets();  
			 
			});	
	});

	$(document).on("click", "#displayTweets", function() {
		view.renderTweets();
	});
	$(document).on("click", "#login", function() {
		auth.validatelogin($("#username").val(), "#usernameinput");
	});
	$(document).ready(function(){
		 
	});
	return that;
}