import Game from "./game";


document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const game = new Game(ctx);
  game.start();
});
