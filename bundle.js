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
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](this.ctx);
  }

  start() {
    this.render(this.ctx);
  }

  render(ctx) {

    this.ctx.clearRect(0, 0, 300, 500);
    this.board.render(this.ctx);
    requestAnimationFrame(this.render.bind(this));
  }
}

Game.DIM_X = 250;
Game.DIM_Y = 500;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(5);


class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.pieces = [];
    this.piece = this.addPiece();
    this.bindEvents();
    this.floor = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]];
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    if (e.key === "ArrowLeft" && this.piece.pos[0] !== 0) {
      this.piece.pos[0] -= 25;
    }
    if (e.key === "ArrowRight" && this.piece.pos[0] < 200) {
      this.piece.pos[0] += 25;
    }
    if (e.key === "ArrowDown" && this.piece.pos[1] < 390) {
      (this.piece.pos[1] += 10);
    }
  }

  render(ctx) {
    var currentPiece = this.pieces[this.pieces.length - 1];
    this.pieces.forEach(piece => {
      // if ((currentPiece.pos[1] + 100 >= piece.pos[1]) && (currentPiece !== piece)){
      //   currentPiece.landed = true;
      // }
      piece.draw(ctx);
    });

    if (this.piece.landed) {

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
    const piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */]();
    this.pieces.push(piece);

    return piece;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
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


/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map