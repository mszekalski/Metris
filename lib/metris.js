import Game from "./game";


document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const game = new Game(ctx);
  const gameStartCallback = () => {
    game.start();
    canvas.removeEventListener('click', gameStartCallback);
  };
  ctx.font = '15pt helvetica';
  ctx.fillStyle = '#1aff1a';
  ctx.fillText('CLICK TO START', 45, 100);
  canvas.addEventListener('click', gameStartCallback);
});
