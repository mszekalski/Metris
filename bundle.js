/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);



document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  const gameStartCallback = () => {
    game.start();
    canvas.removeEventListener('click', gameStartCallback);
  };
  
  ctx.font = '15pt helvetica';
  ctx.fillStyle = '#1aff1a';
  canvas.style.border = "none";
  ctx.fillText('CLICK TO START', 45, 200);
  canvas.addEventListener('click', gameStartCallback);


});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.bindEvents();
  }



  start() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](this.ctx);
    this.paused = false;
    this.render(this.ctx);
    this.score = 0;

  }

  bindEvents() {
    document.addEventListener('keydown', this.pauseAndRestart.bind(this));
    // document.addEventListener('keydown', this.restartGame.bind(this));
  }

  pauseAndRestart(e) {

    if (e.keyCode === 32 && this.board.gameOver === false) {
      this.paused = !this.paused;
    }

    if (e.keyCode === 32 && this.board.gameOver === true) {
      // debugger
      this.start();

    }
  }


  render(ctx) {
    if (this.board.gameOver === true) {
      this.ctx.clearRect(0, 0, 300, 600);
      this.ctx.fillStyle = '#1aff1a';
      this.ctx.fillText('GAME OVER', 68, 200);
      return;
    }
    else if (this.paused === false) {
      this.ctx.clearRect(0, 50, 300, 600);
      this.board.render(this.ctx);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}

Game.DIM_X = 250;
Game.DIM_Y = 550;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(3);


class Board {
  constructor(ctx) {
    this.gameOver = false;
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
          console.log('gameOver')

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
    

      const piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    this.landed = false;
    this.color = randomColor();
    if (this.type === 'I') {
      this.squares = [
      [75,50],
      [100,50],
      [125,50],
      [150,50]
    ];
  } else if (this.type === 'O') {
      this.squares = [
      [100,50],
      [125,50],
      [100,75],
      [125,75]
      ];
    }
    else if (this.type === 'T') {
      this.squares = [
      [100,50],
      [125,50],
      [150,50],
      [125,75]
      ];
    }
    else if (this.type === 'S') {
      this.squares = [
      [100,75],
      [125,75],
      [125,50],
      [150,50]
      ];
    }
    else if (this.type === 'Z') {
      this.squares = [
      [100,50],
      [125,50],
      [125,75],
      [150,75]
      ];
    }
    else if (this.type === 'J') {
      this.squares = [
      [100,50],
      [100,75],
      [125,75],
      [150,75]
      ];
    }
    else if (this.type === 'L') {
      this.squares = [
      [150,50],
      [100,75],
      [125,75],
      [150,75]
      ];
    }

    
    this.rotations = 0;
  }

  draw (ctx) {
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


/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map