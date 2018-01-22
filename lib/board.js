import Piece from "./piece";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.pieces = [];
    this.piece = this.addPiece();
    this.bindEvents();
    this.floor = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]];
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    if (e.key === "ArrowLeft" && this.piece.pos[0] !== 0) {
      this.piece.pos[0] -= 25;
    }
    if (e.key === "ArrowRight" && this.piece.pos[0] < 200) {
      this.piece.pos[0] += 25;
    }
    if (e.key === "ArrowDown" && this.piece.pos[1] < 390) {
      (this.piece.pos[1] += 10);
    }
  }

  render(ctx) {
    var currentPiece = this.pieces[this.pieces.length - 1];
    this.pieces.forEach(piece => {
      // if ((currentPiece.pos[1] + 100 >= piece.pos[1]) && (currentPiece !== piece)){
      //   currentPiece.landed = true;
      // }
      piece.draw(ctx);
    });

    if (this.piece.landed) {

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
