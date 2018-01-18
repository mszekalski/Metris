const Util = require("./util");
const MovingPiece = require("./moving_peice");


class Piece extends MovingPiece {
  constructor(options = {}) {
    this.type = options.type;
    super(options);
  }
}

module.exports = Piece;
