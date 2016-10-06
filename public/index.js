$(document).on("click", "#createTweet", function() {
	var username = getQueryVariable("username");
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
		    "tweetid": guid()
		  }, function(data) {
		  	renderTweets();  
		 
		});	
	}
	
});

$(document).on("click", ".delete", function() {
	
	$.post("/delete", {
		    "tweetid": $(this).attr('id')
		  }, function(data) {
		  	renderTweets();  
		 
		});	
});

$(document).on("click", "#displayTweets", function() {
	renderTweets();
});
$(document).on("click", "#login", function() {
	validatelogin($("#username").val());
});
$(document).ready(function(){
	 
});