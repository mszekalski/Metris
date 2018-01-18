const Util = require("./util");

class MovingPiece {

  constructor() {
    this.pos = [0, 0];
  }

    draw (ctx) {
      ctx.fillStyle= "red";
      ctx.fillRect(5, this.pos[1], 100, 100);
    }

    down(ctx) {
        ctx.clearRect(0, 0, 300, 500);
        this.draw(ctx);
        this.pos[1] += 10;
      }
}

module.exports = MovingPiece;
