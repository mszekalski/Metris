import Piece from "./piece";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.pieces = [];
    this.piece = this.addPiece();
    this.bindEvents();
    this.grid = new Array(20);
    for (let i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(10);
    }
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));

  }

  handleKeyPress(e) {
    if (e.key === "ArrowLeft") {
      this.piece.squares.forEach(coordinates => {
        if (coordinates[0] === 0) {
          console.loog('no');
        }
      });
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] -= 25;
      }

      // this.piece.squares.forEach(coordinates => {
      //
      // });
    }
    if (e.key === "ArrowRight") {
      this.piece.squares.forEach(coordinates => {
        if (coordinates[0] === 225) {
          console.loog('no');
        }
      });
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] += 25;
      }
      // this.piece.squares.forEach(coordinates => {
      //
      // });
    }

    // if (e.key === "ArrowLeft" && this.piece.pos[0] !== 0) {
    //   this.piece.pos[0] -= 25;
    // }
    // if (e.key === "ArrowRight" && this.piece.pos[0] < 200) {
    //   this.piece.pos[0] += 25;
    // }
    // if (e.key === "ArrowDown" && this.piece.pos[1] < 390) {
    //   (this.piece.pos[1] += 10);
    // }
  }

  render(ctx) {
    var currentPiece = this.pieces[this.pieces.length - 1];
    this.pieces.forEach(piece => {
      currentPiece.squares.forEach(coordinates => {

        if ((this.grid[coordinates[0]/25][coordinates[1]/25]) === 'filled') {
          currentPiece.landed = true;
          
        }
      });
      // if ((currentPiece.pos[1] + 100 >= piece.pos[1]) && (currentPiece !== piece)){
      //   currentPiece.landed = true;
      // }
      piece.draw(ctx);
    });

    if (this.piece.landed) {
      // this.grid[this.piece.pos[0]/25][this.piece.pos[1]/25] = 'filled';
      this.piece.squares.forEach(coordinates => {
        this.grid[coordinates[0]/25][coordinates[1]/25] = 'filled';
      });

      this.piece = this.addPiece();
    } else {
      this.piece.down(ctx);
    }
  }

  start(ctx) {
    ctx.clearRect(0, 0, 300, 500);
      this.bindEvents();
  }


  addPiece() {
    const piece = new Piece();
    this.pieces.push(piece);

    return piece;
  }

}

export default Board;
