import Piece from "./piece";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.pieces = [];
    this.piece = this.addPiece();
    this.bindEvents();
    this.grid = new Array(20);
    for (let i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(10);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = null;
      }
    }
  }
  rotationCheck() {
    for (let i = 0; i < this.piece.squares.length; i++) {
      let x = this.piece.squares[i][0];
      let y = this.piece.squares[i][1];
      if ((this.piece.squares[i][0] === 0 && this.piece.rotations % 2 !== 0) ||
      (this.piece.squares[i][0] === 25 && this.piece.rotations % 2 !== 0 && this.piece.type === 'I') ||
      this.piece.squares[i][0] === 225 && this.piece.rotations % 2 !== 0 ||
      (this.piece.squares[i][0] === 200 && this.piece.rotations % 2 !== 0 && (this.piece.type !== 'T')
    && (this.piece.type !== 'S') && (this.piece.type !== 'Z') && (this.piece.type !== 'J') &&
  (this.piece.type !== 'L')) ||
      (this.grid[Math.ceil(y/25) - 2][Math.ceil(x/25) + 2] === 'filled' && this.piece.type !== 'T'
    && (this.piece.type !== 'S') && (this.piece.type !== 'Z') && (this.piece.type !== 'J') &&
  (this.piece.type !== 'L')) ||
      (this.grid[Math.ceil(y/25) - 1][Math.ceil(x/25) + 1] === 'filled') ||
      (this.grid[Math.ceil(y/25) + 1][Math.ceil(x/25) + 1] === 'filled') ||
      (this.grid[Math.ceil(y/25) - 1][Math.ceil(x/25) - 1] === 'filled') ||
      (this.grid[Math.ceil(y/25) + 2][Math.ceil(x/25) - 2] === 'filled' && this.piece.type !== 'T'
      && (this.piece.type !== 'S') && (this.piece.type !== 'Z') && (this.piece.type !== 'J') &&
    (this.piece.type !== 'L')) ||
      (this.grid[Math.ceil(y/25) + 1][Math.ceil(x/25) - 1] === 'filled')) {
        return true;
      }
    }
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {

    if (e.key === "ArrowLeft") {
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (x === 0 || (this.grid[Math.ceil(y/25)][Math.ceil(x/25)-1] === 'filled')
        ) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] -= 25;
      }
    }
    if (e.key === "ArrowRight") {
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (x === 225 || (this.grid[Math.ceil(y/25)][Math.ceil(x/25)+1] === 'filled')) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][0] += 25;
      }
    }



    if (e.key === "ArrowDown") {
      for (let i = 0; i < this.piece.squares.length; i++){
        let x = this.piece.squares[i][0];
        let y = this.piece.squares[i][1];
        if (typeof this.grid[Math.ceil((y/25)) + 1] === "undefined"
         || (this.grid[Math.ceil(y/25) + 1][Math.ceil(x/25)] === 'filled')) {
          return;
        }
      }
      for (let i = 0; i < this.piece.squares.length; i++){
        this.piece.squares[i][1] += 20;
      }
    }

      if (e.key === "r" || e.key === "R") {
        if (this.piece.type === 'O'){
          return;
        }
        if (this.piece.type === 'I') {
          if (this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][0] += 50;
              this.piece.squares[0][1] -= 25;
              this.piece.squares[1][0] += 25;
              this.piece.squares[2][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] += 50;


              this.piece.rotations += 1;
          } else if (this.piece.rotations === 1){
            this.piece.squares[0][0] += 25;
            this.piece.squares[0][1] += 50;
            this.piece.squares[1][1] += 25;
            this.piece.squares[2][0] -= 25;
            this.piece.squares[3][0] -= 50;
            this.piece.squares[3][1] -= 25;


            this.piece.rotations += 1;
          } else if (this.piece.rotations === 2){
            this.piece.squares[0][0] -= 50;
            this.piece.squares[0][1] += 25;
            this.piece.squares[1][0] -= 25;
            this.piece.squares[2][1] -= 25;
            this.piece.squares[3][0] += 25;
            this.piece.squares[3][1] -= 50;
            this.piece.rotations += 1;
          } else if (this.piece.rotations === 3){
            this.piece.squares[0][0] -= 25;
            this.piece.squares[0][1] -= 50;
            this.piece.squares[1][1] -= 25;
            this.piece.squares[2][0] += 25;
            this.piece.squares[3][0] += 50;
            this.piece.squares[3][1] += 25;
            this.piece.rotations = 0;
          }
        }
        if (this.piece.type === 'T') {
          if(this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][0] += 25;
              this.piece.squares[0][1] -= 25;
              this.piece.squares[2][0] -= 25;
              this.piece.squares[2][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] -= 25;
              this.piece.rotations += 1;
            } else if (this.piece.rotations === 1){
              this.piece.squares[0][0] += 25;
              this.piece.squares[0][1] += 25;
              this.piece.squares[2][0] -= 25;
              this.piece.squares[2][1] -= 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] -= 25;
              this.piece.rotations += 1;
          } else if (this.piece.rotations === 2){
            this.piece.squares[0][0] -= 25;
            this.piece.squares[0][1] += 25;
            this.piece.squares[2][0] += 25;
            this.piece.squares[2][1] -= 25;
            this.piece.squares[3][0] += 25;
            this.piece.squares[3][1] += 25;
            this.piece.rotations += 1;
          } else if (this.piece.rotations === 3){
            this.piece.squares[0][0] -= 25;
            this.piece.squares[0][1] -= 25;
            this.piece.squares[2][0] += 25;
            this.piece.squares[2][1] += 25;
            this.piece.squares[3][0] -= 25;
            this.piece.squares[3][1] += 25;
            this.piece.rotations = 0;
          }
        }
        if (this.piece.type === 'S') {
          if(this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][0] += 25;
              this.piece.squares[0][1] += 25;
              this.piece.squares[2][0] -= 25;
              this.piece.squares[2][1] += 25;
              this.piece.squares[3][0] -= 50;
              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 1){
              this.piece.squares[0][0] += 25;
              this.piece.squares[0][1] -= 25;
              this.piece.squares[2][0] += 25;
              this.piece.squares[2][1] += 25;
              this.piece.squares[3][1] += 50;
              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 2){
              this.piece.squares[0][0] -= 25;
              this.piece.squares[0][1] -= 25;
              this.piece.squares[2][0] += 25;
              this.piece.squares[2][1] -= 25;
              this.piece.squares[3][0] += 50;
              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 3){
              this.piece.squares[0][0] -= 25;
              this.piece.squares[0][1] += 25;
              this.piece.squares[2][0] -= 25;
              this.piece.squares[2][1] -= 25;
              this.piece.squares[3][1] -= 50;
              this.piece.rotations = 0;
            }

        }
        if (this.piece.type === 'Z') {
          if(this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][0] += 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] += 25;

              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 1){
              this.piece.squares[0][1] += 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] -= 25;


              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 2){
              this.piece.squares[0][0] -= 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] -= 25;
              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 3){
              this.piece.squares[0][1] -= 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] += 25;
              this.piece.rotations = 0;
            }

        }
        if (this.piece.type === 'J') {
          if(this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][0] += 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] += 25;

              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 1){
              this.piece.squares[0][1] += 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] -= 25;


              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 2){
              this.piece.squares[0][0] -= 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] -= 25;

              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 3){
              this.piece.squares[0][1] -= 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] += 25;

              this.piece.rotations = 0;
            }

        }
        if (this.piece.type === 'L') {
          if(this.rotationCheck()) return;
            if (this.piece.rotations === 0){
              this.piece.squares[0][1] += 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] += 25;


              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 1){
              this.piece.squares[0][0] -= 50;
              this.piece.squares[1][0] += 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] -= 25;
              this.piece.squares[3][1] -= 25;



              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 2){
              this.piece.squares[0][1] -= 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] += 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] -= 25;


              this.piece.rotations += 1;
            }
            else if (this.piece.rotations === 3){
              this.piece.squares[0][0] += 50;
              this.piece.squares[1][0] -= 25;
              this.piece.squares[1][1] -= 25;
              this.piece.squares[3][0] += 25;
              this.piece.squares[3][1] += 25;


              this.piece.rotations = 0;
            }

        }


      }



  }





  render(ctx) {
    var currentPiece = this.pieces[this.pieces.length - 1];
    this.pieces.forEach(piece => {
      currentPiece.squares.forEach(coordinates => {
        if (typeof this.grid[Math.floor((coordinates[1]/25)) + 1] === "undefined" ||
        this.grid[Math.floor((coordinates[1]/25)) + 1][(coordinates[0]/25)] === 'filled') {
          currentPiece.landed = true;

        }
      });
      piece.draw(ctx);
    });
    if (this.piece.landed) {
      this.piece.squares.forEach(coordinates => {
        this.grid[Math.floor(coordinates[1]/25)][coordinates[0]/25] = 'filled';
      });
      for (let i = this.grid.length - 1; i >= 0; i--) {
        if (this.grid[i].every(el => el === 'filled')) {
          this.grid.splice(i, 1);
          this.grid.unshift(new Array(10));
          for (let j = 0; j < this.pieces.length; j++) {
            for (let k = 0; k < this.pieces[j].sqaures.length; k++){

            }
          }
        }



      }
      this.piece = this.addPiece();
    } else {
      this.piece.down(ctx);
    }
  }

  start(ctx) {
    ctx.clearRect(0, 0, 300, 500);
      this.bindEvents();
  }


  addPiece() {
    const piece = new Piece();
    this.pieces.push(piece);
    return piece;
  }

}

export default Board;
