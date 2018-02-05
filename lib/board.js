import Piece from "./piece";

class Board {
  constructor(ctx) {
    this.gameOver = false;
    this.paused = false;
    this.score = 0;
    this.ctx = ctx;
    this.pieces = [];
    this.bindEvents();
    this.grid = new Array(22);
    for (let i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(10);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = null;
      }
    }
    this.piece = this.addPiece();
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

  if (!this.paused) {
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
  }

  createNewRow() {
    this.grid.unshift(new Array(10));
    for (let z = 0; z < this.grid[0].length; z++){
      this.grid[0][z] = null;
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
      let spliceCount = 0;
      let deletedRows = [];
      this.piece.squares.forEach(coordinates => {
        if (coordinates[1] < 50) {
          this.gameOver = true;


        }
        this.grid[Math.floor(coordinates[1]/25)][coordinates[0]/25] = 'filled';
      });
      for (let i = this.grid.length - 1; i >= 0; i--) {
        if (this.grid[i].every(el => el === 'filled')) {
          for (let l = 0; l < this.pieces.length; l++){
            for (let m = this.pieces[l].squares.length - 1; m >= 0 ; m--){
              if (Math.floor(this.pieces[l].squares[m][1]/25 === (i))) {
                  this.pieces[l].squares.splice(m, 1);
                  if (deletedRows.indexOf(i) === -1) {
                    deletedRows.push(i);
                    this.score += 10;
                    document.querySelector('.score').innerHTML = "SCORE: " + this.score;
                  }
              }
            }
          }

          this.grid.splice(i, 1);
          spliceCount += 1;

        }
      }

      for (let p = 0; p < this.pieces.length; p++){
        for (let m = 0; m < this.pieces[p].squares.length; m++){
          for (let r = deletedRows.length - 1; r >= 0; r--) {
            if (this.pieces[p].squares[m][1]/25 < deletedRows[r]) {
              this.pieces[p].squares[m][1] += 25;
            }
          }
        }
      }

      for (let y = 0; y < spliceCount; y++) {
        this.createNewRow();
      }
      this.piece = this.addPiece();
    } else {
      this.piece.down(ctx);
    }
  }

  start(ctx) {
    ctx.clearRect(0, 50, 300, 600);
      this.bindEvents();
  }

  addPiece() {


      const piece = new Piece();
      this.pieces.push(piece);
      for (let i = 0; i < piece.squares.length; i++){


        if (this.grid[Math.floor(piece.squares[i][1]/25)][piece.squares[i][0]/25] === 'filled') {
          piece.squares[i][1] -= 25;
        }
      }
      // debugger
      return piece;

  }
}

export default Board;
