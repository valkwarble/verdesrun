/**
 * Constructs and returns the controller for the game of life board. 
 * This class handles the user inferface and owns the Board and View to prevent rep exposure to client
 * Initiates View and event handlers for UX and appends prerendered HTML to target div
 * 
 * @param Board - Board class to generate
 * @param View - View class to generate
 * @returns- Controller object
 * @constructor
 */
var View = function (){

	var that;

	/**
	   * Renders the current tweets to the board after the data fetching is complete using the client side template available.
	   */
	that.renderTweets= function(){
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
		that.renderTweets();  
	});

	return that;
}