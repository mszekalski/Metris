
import Board from "./board";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(this.ctx);
    this.paused = false;
    this.bindEvents();
    this.gameOver = false;
  }

  start() {
    this.render(this.ctx);

  }

  bindEvents() {
    document.addEventListener('keydown', this.pauseGame.bind(this));
  }

  pauseGame(e) {
    if (e.keyCode === 32 ) {
      this.paused = !this.paused;
    }
  }

  render(ctx) {
    if (this.paused === false) {

      this.ctx.clearRect(0, 0, 300, 500);
      this.board.render(this.ctx);
    }
      requestAnimationFrame(this.render.bind(this));

  }
}

Game.DIM_X = 250;
Game.DIM_Y = 500;

export default Game;
