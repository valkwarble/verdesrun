(function() {
  mocha.setup("bdd");

  var assert = chai.assert;
  var expect = chai.expect;
  var to = chai.to;
  var equal =chai.equal;

  describe("Board", function() { 

    describe("neighbors", function(){

      it("should return an array of 0s representing that each cells neighbors are all dead ", function(){
        var board = Board(10,10);
        board.initBoard();
        var results = board.neighbors();
        var answer = Array(100).fill(0); 
        expect(results).to.deep.equal(answer);
      })


    });

    describe("breedcell", function(){

      it("should set the value of the cell at 0,0 to 1 signifying it is now alive", function(){
        var board = Board(10,10);
        board.initBoard();
        board.breedCell(0,0);
        var results = board.board[0].value
        var answer = 1; 
        expect(results).to.deep.equal(answer);
      })


    });

    describe("updateModel", function(){

      it("should kill cells that do not have enough neighbors according to conways rules: test cell alive no neighbors dies", function(){
        var board = Board(10,10);
        board.initBoard();
        board.breedCell(0,0);
        board.updateModel();
        var results = board.board[0].value
        var answer = 0; 
        expect(results).to.deep.equal(answer);
      })

      it("should kill cells that do not have enough neighbors according to conways rules: test cell alive 2 neighbors lives", function(){
        var board = Board(10,10);
        board.initBoard();
        board.breedCell(0,0);
        board.breedCell(1,0);
        board.breedCell(0,1);
        board.updateModel();
        var results = board.board[0].value
        var answer = 1; 
        expect(results).to.deep.equal(answer);
      })
       it("should kill cells that do not have enough neighbors according to conways rules: test cell alive 4+ neighbors dies", function(){
        var board = Board(10,10);
        board.initBoard();
        board.breedCell(1,1);
        board.breedCell(1,0);
        board.breedCell(1,2);
        board.breedCell(0,1);
        board.breedCell(2,1);
        board.updateModel();
        var results = board.board[board.width*1+1].value
        var answer = 0; 
        expect(results).to.deep.equal(answer);
      })
       it("should breed cell that have exaclty 3 neighbors according to conways rules: test dead cell with 3 neighbors lives", function(){
        var board = Board(10,10);
        board.initBoard();

        board.breedCell(1,2);
        board.breedCell(0,1);
        board.breedCell(2,1);
        board.updateModel();
        var results = board.board[board.width*1+1].value
        var answer = 1; 
        expect(results).to.deep.equal(answer);
      })

    });


  });
  describe("View", function() { 

    describe("draw", function(){
      it("should render an empty board to this div", function(){
        var board = Board(10,10);
        board.initBoard();
        board.breedCell(0,0);
        board.updateModel();
        var view = View(board,'viewTest');
        view.draw(board.board);
        var results = true;
        var answer = true; 
        expect(results).to.deep.equal(answer);
      })
    });
    describe("pause", function(){
      it("should play the game, started from a random starting configuration and pause", function(){
        var board = Board(100,100);
        board.initBoard();
        board.breedCell(0,0);
        board.updateModel();
        var view = View(board,'viewTest');
        view.draw(board.board);
        view.random();
        view.play();
        view.pause();
        var results = true;
        var answer = true; 
        expect(results).to.deep.equal(answer);
      })
    })
    describe("play", function(){
      it("should play the game from a glider starting configuration", function(){
        var board = Board(100,100);
        board.initBoard();
        board.breedCell(0,0);
        board.updateModel();
        var view = View(board,'viewTest');
        view.draw(board.board);
        view.drawGliderL();
        view.play();
        var results = true;
        var answer = true; 
        expect(results).to.deep.equal(answer);

      })
    });
    

  });
  mocha.run();
})()
