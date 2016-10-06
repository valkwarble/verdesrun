/**
 * Constructs and returns the model for the game of life board. 
 * This class is the logic behind the game of life and datastructure
 * to maintain state and pass prerendered HTML to the view
 * 
 * @param width - positive integer representing max number of cells in one row
 * @param height - positive integer representing max number of cells in one collumn
 * @returns- Board object
 * @constructor
 */
var Board = function (width, height){
  var that = Object.create(Board.prototype);
  
  //allow them to change it in the future (game variation)
  that.width = width || 10;
  that.height= height || 10;
  
  //model will be owed by controller to avoid rep exposure to client 
  var board = Array(width*height);   
  //need to make this public to test properly
  that.board = board;
  that.animate = false;
  /**
  * Initializes the model
  * A 1d Array of board element objects each keeping track of its neighbors and indexed as [x,y] = Array[ width * y + x ]
  * builds data model to to plug into statemachine
  */
  that.initBoard = function(){
    /**
    * creates Board Element Models initializing them as dead
    * generates data to pass to view
    * builds data model to to plug into statemachine
    */
    var newBoardElement = function(){ return {neighbors:[], x:0, y:0, value:0, html: $("<div class='dead cell'>")[0]}; } // check boundaries
    
    /**
    * creates board elements
    */
    var initBoardElement = function(x, y){
      board[width * y + x] = newBoardElement();
      board[width * y + x].x=x;
      board[width * y + x].y=y;
      board[width * y + x].html = $("<div id="+x+"_"+y+" = class='dead cell'>")[0];
    }
    /**
    * creates neighbor references 
    */
    var neighborsListFunction = [
      function (x,y){return ((x-1)>-1 && (y-1)>-1 && (x-1)<width && (y-1)<height) ? board[width * (y-1) + x-1].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x+0)>-1 && (y-1)>-1 && (x+0)<width && (y-1)<height) ? board[width * (y-1) + x+0].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x+1)>-1 && (y-1)>-1 && (x+1)<width && (y-1)<height) ? board[width * (y-1) + x+1].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x-1)>-1 && (y+0)>-1 && (x-1)<width && (y+0)<height) ? board[width * (y+0) + x-1].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x+1)>-1 && (y+0)>-1 && (x+1)<width && (y+0)<height) ? board[width * (y+0) + x+1].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x-1)>-1 && (y+1)>-1 && (x-1)<width && (y+1)<height) ? board[width * (y+1) + x-1].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x+0)>-1 && (y+1)>-1 && (x+0)<width && (y+1)<height) ? board[width * (y+1) + x+0].neighbors.push(board[width * y + x]):"invalid"},
      function (x,y){return ((x+1)>-1 && (y+1)>-1 && (x+1)<width && (y+1)<height) ? board[width * (y+1) + x+1].neighbors.push(board[width * y + x]):"invalid"}
      
    ];

    //start up the board according to parameters
    for (var y=0; y<height; y++) {
        for (var x=0; x<width; x++) {
          initBoardElement(x,y);
        }
    };
    //link neighbors using 
    var i = 0;
    for (var y=0; y<height; y++) {
        for (var x=0; x<width; x++) {
          i=0;
          neighborsListFunction.map(function(neighbor){ 
            neighbor(x,y);
          });
        }
    };

  }//initBoard Function

  /**
    * maps the array of board elements to how many of their neighbors are still alive
    *@param height - posi
    * @returns (x,y):[width * y + x] indexed Array of number of neighbors alive in other cells
    */
  that.neighbors = function (){
  return  board.map(function(cell){ 
    return cell.neighbors.map(function(neighbor){
      return neighbor.value;
      }).reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
      });
    });
  }// map of number of neighbors alive in each cell



   /**
    * generates FSM that defines if a cell will live given its current state and the number of neighbors
    * follows conways rules *below* 
    * @returns  function that defines if a cell will live for a particular neighbor
    */
//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by over-population.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  that.rules = function (x){
    switch(x) {
        case 0:
            return function(life){ return life? false:false};
        case 1:
            return function(life){ return life? false:false};//f&&t
        case 2:
          return function(life){ return life? true:false};
        case 3:
          return function(life){ return life? true:true};
        case 4:
          return function(life){ return life? false:false}
        case 5:
          return function(life){ return life? false:false}
        case 6:
          return function(life){ return life? false:false}
        case 7:
          return function(life){ return life? false:false}
        case 8:
          return function(life){ return life? false:false}
      }
  };
  /**
    * creates a cell at the designated location
    * @param x - collumn location to place living cell
    * @param y - row location to place living cell
  **/
  that.breedCell = function(x,y){
    board[this.width * y + x].html = $("<div id="+x+"_"+y+" = class='alive cell'>")[0];
    board[this.width * y + x].value=1;
  }
  
  /**
    * Updates model according to rules FSM
    * Generates prerendered model of next cell state
  **/
  that.updateModel = function(){
    
    var newMap = this.neighbors().map(this.rules);
    //console.log(newMap);
    for (var y=0; y<this.height; y++) {
        for (var x=0; x<this.width; x++) {

          if (newMap[this.width * y + x](board[this.width * y + x].value ==1)){

            if (board[this.width * y + x].value==1){}
            else{
              board[this.width * y + x].value=1;
              board[this.width * y + x].html = "<div id="+x+"_"+y+" = class='alive cell '>";  
            }
            
          }//ALIVE THRESHHOLD
          else{

            if (board[this.width * y + x].value==1){
              board[this.width * y + x].value=0;
              board[this.width * y + x].html = "<div id="+x+"_"+y+" = class='dead cell '>";
            };
            
          }//DEATH THRESHOLD

        }
    };
    return this;
  }

  

  return that;
}



