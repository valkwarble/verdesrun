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
var Controller = function (Board, View, div){

	var that = Object.create(View.prototype);

	
	var boardModel = Board(100,100);
	boardModel.initBoard();
	var view = View(boardModel, div);
	view.draw(boardModel.board);


	/**
    * creates event handler to draw gliders going right 
    */

	$(".gliderL").on("mousedown", function() {
		view.drawGliderL();
	});
	/**
    * creates event handler to draw gliders going left 
    */
	$(".gliderR").on("mousedown", function() {
		view.drawGliderR();
	});
	/**
    * creates event handler to draw random formations
    */
	$(".random").on("mousedown", function() {
		view.random();
	});
	/**
    * creates event handler to reset the board
    */
	$(".reset").on("mousedown", function() {
		view.reset();
	});
/**
    * creates event handler to start simulation 
    */
	$(".start").on("mousedown", function() {
		view.play();
	});
/**
    * creates event handler to pause simulation
    */
	$(".stop").on("mousedown", function() {
		view.pause();
	});

	/**
    * creates event handler to allow user to draw arbitraty configuration
    */
	$(".cell").on("mousedown", function() {
		if ($(this).hasClass( "dead" )) {
	      $( this ).removeClass( "dead" ).addClass( "alive" );
	    }
		var coords = $(this).attr('id').split("_");
		boardModel.breedCell(parseInt(coords[0]),parseInt(coords[1]));
	});

	/**
    * creates event handler to allow user to draw arbitraty configurations smoothly
    */
	$(".cell").on("mouseover", function() {
	    if ($(this).hasClass( "dead" )) {
	      $( this ).removeClass( "dead" ).addClass( "alive" );
	    }
	    if ($(this).hasClass( "dead" )) {
	      $( this ).removeClass( "dead" ).addClass( "alive" );
	    }
		var coords = $(this).attr('id').split("_");
		boardModel.breedCell(parseInt(coords[0]),parseInt(coords[1]));
	});

   return that;
}