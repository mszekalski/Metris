// Set up listener for left and right keys of your choosing
// When you hit left key (for example) subtract X property
// When you hit right key increase X property on this.pos

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Piece {

  constructor() {

    this.pos = [100, 0];
    this.landed = false;
    this.color = randomColor();
  }


  draw (ctx) {
    ctx.fillStyle= this.color;
    ctx.fillRect(this.pos[0], this.pos[1], 100, 100);

  }

  down(ctx) {
    if (this.landed) return;
      this.pos[1] += 1;
      if (this.pos[1] >= 400) {
        this.landed = true;
      }
  }




}


export default Piece;
