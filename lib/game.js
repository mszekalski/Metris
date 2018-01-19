class Game {
  constructor(options) {
    this.currentPiece = options.currentPiece;
    this.nextPiece = options.nextPiece;
    this.pieces = [];
  }

  
}

Game.DIM_X = 300;
Game.DIM_Y = 500;

module.exports = Game;
