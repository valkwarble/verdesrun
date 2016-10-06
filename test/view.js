/**
 * Constructs and returns the view for the game of life board. 
 * This class handles the rendering of the game to the DOM
 * 
 * @param [Board] boardModel - game board to render to screen 
 * @param [string] divId - id of html element to render into 
 * @returns- [View] view object 
 * @constructor
 */
var View = function (boardModel, divId){

  var that = Object.create(View.prototype);
  
  that.board = boardModel;  
  that.width = boardModel.width;
  that.height = boardModel.height;
  that.divId = divId

  /**
  * Updates the view to the next state of the board given a Board Object
  * @param [Board] boardObj - board object to advance and render
  */
  that.updateView = function(boardObj){

      var that = boardObj;
      var newBoard = that.updateModel();
      this.draw(newBoard.board);   


    }
  /**
  * generates HTML to render current state of the board to the divId the user defined
  * @param [Board] boardd - board object to render onto the DOM
  */
  that.draw= function(boardd) {
      var board = boardd;
      gameBoard = $("<div id='board'> </div>"); 
      gameBoard.width(this.width*2);
      gameBoard.height(this.height*2);
      for (y=0; y<this.height; y++) {
       var rowDiv = $('<div class="mrow '+y+'">');
        for (x=0; x<this.width; x++) {
          rowDiv.append(board[this.width * y + x].html); 
        } 
        gameBoard.append(rowDiv);
      }
      $( "#"+this.divId ).empty();
      $( "#"+this.divId ).append(gameBoard);

     
    }
  /**
  * Starts simulation and renders to the dom every 300 ms
  */
  that.play=function(){
      var that = this;
      that.board.animate=true;

      setInterval(function(){
        if(that.board.animate){

          that.updateView(that.board);
         
           }

        
      },300)
     
      
      }
  /**
  * pauses simulation 
  */
  that.pause=function(){
      var that = this.board;
      that.animate=false;
      
    }
  /**
  * restart simulation and clear everything
  */
  that.reset=function(){
      location.reload();
      
    }
  /**
  * draws a glider at a random location on the left board that flies to the right
  */
  that.drawGliderL =function(){
    var i =0;
    
    var x = Math.floor((Math.random() * 50));
    var y = Math.floor((Math.random() * 100));
    try{
      boardModel.breedCell(x,y);
      boardModel.breedCell(x-1,y);
      boardModel.breedCell(x+1,y);
      boardModel.breedCell(x+1,y+1);
      boardModel.breedCell(x,y+2);
      this.draw(boardModel.board);  
    }
    catch(e){
      //"out of bounds spawn blocked TRY AGAIN")
      this.drawGliderL();
    }
    

  }
  /**
  * draws a glider at a random location on the right board that flies to the left
  */
  that.drawGliderR =function(){
    var i =0;
    
    var x = Math.floor((Math.random() * 50)+50);
    var y = Math.floor((Math.random() * 100));
    try{
      boardModel.breedCell(x,y);
      boardModel.breedCell(x-1,y);
      boardModel.breedCell(x+1,y);
      boardModel.breedCell(x-1,y-1);
      boardModel.breedCell(x,y-2);
      this.draw(boardModel.board);
  
    }
    catch(e){
      this.drawGliderR();
    }
    
  }
  /**
  * draws a random number of randomly positioned cells on the board 
  */
  that.random =function(){
    //will end with 99% certainty after O(1^5) itterations to get a dense population if the board
    while (Math.floor((Math.random() * 2000))!= 42){
      var x = Math.floor((Math.random() * 100));
      var y = Math.floor((Math.random() * 100));
      boardModel.breedCell(x,y);
      
    }
    this.draw(boardModel.board);
  }

  return that;
}