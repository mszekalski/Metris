import Piece from "./piece";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.pieces = [];
    this.piece = this.addPiece();
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    if (e.key === "ArrowLeft" && this.piece.pos[0] !== 0) {
      this.piece.pos[0] -= 5;
    }
    if (e.key === "ArrowRight" && this.piece.pos[0] < 200) {
      this.piece.pos[0] += 5;
    }
    if (e.key === "ArrowDown" && this.piece.pos[1] < 390) {
      (this.piece.pos[1] += 10);
    }
  }

  render(ctx) {
    
    this.pieces.forEach(piece => {

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
