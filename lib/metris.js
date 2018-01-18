const Game = require("./game");
const Board = require("./board");
const MovingPiece = require("./moving_piece");


document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const piece = new MovingPiece;
  setInterval(() => piece.down(ctx), 1000);
});
