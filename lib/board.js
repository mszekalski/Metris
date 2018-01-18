const MovingPiece = require("./moving_piece");

class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    
    setInterval(MovingPiece.down(this.ctx), 1000);
  }
}

module.exports = Board;
