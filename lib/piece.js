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

// const PIECE_TYPES = ['I' ,'O' ,'T','S','Z','J','L'];
const PIECE_TYPES = [
  'I',
  'O',
  'T',
  'S',
  'Z',
  'J',
  'L'];

class Piece {

  constructor() {
    this.type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
    this.pos = [100, 0];
    this.landed = false;
    this.color = randomColor();
  }

  draw (ctx) {
    ctx.fillStyle = this.color;
    if (this.type === 'O') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1] + 25, 25, 25);
    }
    else if (this.type === 'I') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] + 50), this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] + 75), this.pos[1], 25, 25);
    }
    else if (this.type === 'T') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] - 25), this.pos[1] + 25, 25, 25);
    }
    else if (this.type === 'S') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] - 25), this.pos[1] + 25, 25, 25);
    }
    else if (this.type === 'Z') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0] - 25), this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1] + 25, 25, 25);
    }
    else if (this.type === 'J') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] + 25), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] + 50), this.pos[1] + 25, 25, 25);
    }
    else if (this.type === 'L') {
      ctx.fillRect(this.pos[0], this.pos[1], 25, 25);
      ctx.fillRect((this.pos[0]), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] - 25), this.pos[1] + 25, 25, 25);
      ctx.fillRect((this.pos[0] - 50), this.pos[1] + 25, 25, 25);
    }
  }

  down(ctx) {
    if (this.landed) return;
      this.pos[1] += 1;
        if (this.pos[1] >= (900 - this.pos[1])) {
          this.landed = true;
        }
  }
}


export default Piece;
