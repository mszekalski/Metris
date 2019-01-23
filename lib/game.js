import Board from "./board";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.bindEvents();
    document.querySelector(".score").innerHTML = "SCORE: " + 0;
  }

  start() {
    this.board = new Board(this.ctx);
    this.paused = false;
    this.render(this.ctx);
    this.board.score = 0;
    document.querySelector(".score").innerHTML = "SCORE: " + this.board.score;
  }

  bindEvents() {
    document.addEventListener("keydown", this.pauseAndRestart.bind(this));
  }

  pauseAndRestart(e) {
    if (e.keyCode === 32 && this.board.gameOver === false) {
      this.board.paused = !this.board.paused;
      this.paused = !this.paused;
    }

    if (e.keyCode === 32 && this.board.gameOver === true) {
      this.start();
    }
  }

  render(ctx) {
    if (this.board.gameOver === true) {
      this.ctx.clearRect(0, 0, 300, 600);
      this.ctx.fillStyle = "#1aff1a";
      this.ctx.fillText("GAME OVER", 68, 200);
      return;
    } else if (this.paused === false) {
      this.ctx.clearRect(0, 50, 300, 600);
      this.board.render(this.ctx);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}

Game.DIM_X = 250;
Game.DIM_Y = 550;

export default Game;
