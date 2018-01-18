const Util = require("./util");

class MovingPiece {

  constructor(options) {
    this.pos = options.pos;
    this.pieceType = options.pieceType;
    this.color = options.color;
    this.vel = options.vel;
  }


    draw () {
      ctx.fillStyle="red";
      ctx.fillRect(5, y, 100, 100);
    }

    down() {
        ctx.clearRect(0, 0, 300, 500);
        square.draw();
        y += 10;
  };

    setInterval(down, 1000);
}
