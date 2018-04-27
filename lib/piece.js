// Set up listener for left and right keys of your choosing
// When you hit left key (for example) subtract X property
// When you hit right key increase X property on this.pos

// function randomColor() {
//   const hexDigits = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 3; i++) {
//     color += hexDigits[Math.floor((Math.random() * 16))];
//   }
//   return color;
// }

const PIECE_TYPES = ["I", "O", "T", "S", "Z", "J", "L"];

class Piece {
  constructor() {
    this.type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];

    this.landed = false;
    // this.color = randomColor();
    if (this.type === "I") {
      this.color = "red";
      this.squares = [[75, 50], [100, 50], [125, 50], [150, 50]];
    } else if (this.type === "O") {
      this.color = "orange";
      this.squares = [[100, 50], [125, 50], [100, 75], [125, 75]];
    } else if (this.type === "T") {
      this.color = "yellow";
      this.squares = [[100, 50], [125, 50], [150, 50], [125, 75]];
    } else if (this.type === "S") {
      this.color = "green";
      this.squares = [[100, 75], [125, 75], [125, 50], [150, 50]];
    } else if (this.type === "Z") {
      this.color = "blue";
      this.squares = [[100, 50], [125, 50], [125, 75], [150, 75]];
    } else if (this.type === "J") {
      this.color = "cyan";
      this.squares = [[100, 50], [100, 75], [125, 75], [150, 75]];
    } else if (this.type === "L") {
      this.color = "ivory";
      this.squares = [[150, 50], [100, 75], [125, 75], [150, 75]];
    }

    this.rotations = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.squares.length; i++) {
      ctx.fillRect(this.squares[i][0], this.squares[i][1], 25, 25);
    }
  }

  down(ctx) {
    // debugger
    if (this.landed) return;
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i][1] += 1;
      this.squares.forEach(coordinates => {
        if (coordinates[1] > 525) {
          this.landed = true;
        }
      });
    }
  }
}

export default Piece;
