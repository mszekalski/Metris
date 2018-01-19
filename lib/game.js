
import Board from "./board";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(this.ctx);
  }

  start() {
    this.render(this.ctx);
  }

  render(ctx) {
    
    this.ctx.clearRect(0, 0, 300, 500);
    this.board.render(this.ctx);
    requestAnimationFrame(this.render.bind(this));
  }
}

Game.DIM_X = 300;
Game.DIM_Y = 500;

export default Game;
