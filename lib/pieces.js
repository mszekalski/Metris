const Util = require("./util");
const MovingPiece = require("./moving_peice");

const DEFAULTS = {
  SPEED: 3
};

class Piece {
  constructor(options = {}) {
    this.type = options.type;

  }
}
