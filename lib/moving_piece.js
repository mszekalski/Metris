// Set up listener for left and right keys of your choosing
// When you hit left key (for example) subtract X property
// When you hit right key increase X property on this.pos

class MovingPiece {

  constructor(ctx) {
    this.pos = [0, 0];
    this.landed = false;
    // this.type =
    this.bindEvents();

  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    if (e.key === "ArrowLeft" && this.pos[0] !== 0) {
      this.pos[0] -= 5;
    }
    if (e.key === "ArrowRight" && this.pos[0] < 200) {
      this.pos[0] += 5;
    }
    if (e.key === "ArrowDown") {
      this.pos[1] += 10;
    }
  }
  draw (ctx) {
    ctx.fillStyle= "red";
    ctx.fillRect(this.pos[0], this.pos[1], 100, 100);
  }

  down(ctx) {
    if (this.landed) return;
      ctx.clearRect(0, 0, 300, 500);
      this.draw(ctx);
      this.pos[1] += 10;
      if (this.pos[1] >= 400) {
        this.landed = true;
      }
  }

  start(ctx) {
    let gameover = false;
    if (gameover === true) return;
    else {
      this.bindEvents();
      const piece = new MovingPiece;
      setInterval(() => piece.down(ctx), 175);
    }
  }
}


module.exports = MovingPiece;
