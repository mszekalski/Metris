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


const PIECE_TYPES = [
  'I',
  'O',
  'T',
  'S',
  'Z',
  'J',
  'L'
];

class Piece {

  constructor() {
    this.type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
    // this.pos = [125, 0];
    this.landed = false;
    this.color = randomColor();
    if (this.type === 'I') {
      this.squares = [
      [75,0],
      [100,0],
      [125,0],
      [150,0]
    ];
  } else if (this.type === 'O') {
      this.squares = [
      [100,0],
      [125,0],
      [100,25],
      [125,25]
      ];
    }
    else if (this.type === 'T') {
      this.squares = [
      [100,0],
      [125,0],
      [150,0],
      [125,25]
      ];
    }
    else if (this.type === 'S') {
      this.squares = [
      [100,25],
      [125,25],
      [125,0],
      [150,0]
      ];
    }
    else if (this.type === 'Z') {
      this.squares = [
      [100,0],
      [125,0],
      [125,25],
      [150,25]
      ];
    }
    else if (this.type === 'J') {
      this.squares = [
      [100,0],
      [100,25],
      [125,25],
      [150,25]
      ];
    }
    else if (this.type === 'L') {
      this.squares = [
      [150,0],
      [100,25],
      [125,25],
      [150,25]
      ];
    }
    this.rotations = 0;
  }

  draw (ctx) {
    ctx.fillStyle = this.color;
      ctx.fillRect(this.squares[0][0], this.squares[0][1], 25, 25);
      ctx.fillRect(this.squares[1][0], this.squares[1][1], 25, 25);
      ctx.fillRect(this.squares[2][0], this.squares[2][1], 25, 25);
      ctx.fillRect(this.squares[3][0], this.squares[3][1], 25, 25);
  }

  down(ctx) {
    if (this.landed) return;
      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i][1] += 1;
        this.squares.forEach(coordinates => {
          if (coordinates[1] > 475) {
            this.landed = true;

          }
        });
      }
  }
}


export default Piece;
