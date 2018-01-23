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
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (x === 0 || (this.grid[Math.ceil(y/25)][Math.ceil(x/25)-1] === 'filled')
        ) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] -= 25;
      }
    }
    if (e.key === "ArrowRight") {
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (x === 225 || (this.grid[Math.ceil(y/25)][Math.ceil(x/25)+1] === 'filled')) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] += 25;
      }
    }

    if (e.key === "ArrowDown") {
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (typeof this.grid[Math.ceil((y/25)) + 1] === "undefined"
         || (this.grid[Math.ceil(y/25) + 1][Math.ceil(x/25)] === 'filled')) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][1] += 20;
      }
    }
  }

  render(ctx) {
    var currentPiece = this.pieces[this.pieces.length - 1];
    this.pieces.forEach(piece => {
      currentPiece.squares.forEach(coordinates => {
        if (typeof this.grid[Math.floor((coordinates[1]/25)) + 1] === "undefined" ||
        this.grid[Math.floor((coordinates[1]/25)) + 1][(coordinates[0]/25)] === 'filled') {
          currentPiece.landed = true;
        }
      });
      piece.draw(ctx);
    });
    if (this.piece.landed) {
      this.piece.squares.forEach(coordinates => {
        this.grid[Math.floor(coordinates[1]/25)][coordinates[0]/25] = 'filled';
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
