
import Board from "./board";

class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.bindEvents();
  }



  start() {
    this.board = new Board(this.ctx);
    this.paused = false;
    this.render(this.ctx);

  }

  bindEvents() {
    document.addEventListener('keydown', this.pauseAndRestart.bind(this));
    // document.addEventListener('keydown', this.restartGame.bind(this));
  }

  pauseAndRestart(e) {

    if (e.keyCode === 32 && this.board.gameOver === false) {
      this.paused = !this.paused;
    }

    if (e.keyCode === 32 && this.board.gameOver === true) {
      // debugger
      this.start();

    }
  }


  render(ctx) {
    if (this.board.gameOver === true) {
      this.ctx.clearRect(0, 0, 300, 600);
      this.ctx.fillStyle = '#1aff1a';
      this.ctx.fillText('GAME OVER', 68, 200);
      return;
    }
    else if (this.paused === false) {
      this.ctx.clearRect(0, 50, 300, 600);
      this.board.render(this.ctx);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}

Game.DIM_X = 250;
Game.DIM_Y = 550;

export default Game;
