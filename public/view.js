/**
   * Renders the current tweets to the board after the data fetching is complete using the client side template available.
   */
function renderTweets(){
	$.get("/database", {
		"get":"tweets"
	},function(data) {
	  	Handlebars.registerPartial('fritter',
    '<{{tagName}}>{{tweet}}</{{tagName}}>'
    + '<div class="body">By {{username}} </div><div class="delete" id = {{tweetid}}>DELETE</div>');

		var source   = $("#tweetBoardTemplate").html();
		var template = Handlebars.compile(source);


		var context = JSON.parse(data);

		var html    = template(context);
		$('#tweetBoard').empty();
		$('#tweetBoard').append(html);
	});

}

//Render initial tweets when the page loads
$(document).ready(function(){
	renderTweets();  
});