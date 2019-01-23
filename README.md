# README

# Metris

## Deployed Product

http://mattski.codes/Metris//

## About

Metris is a vanilla Javascript game, that emulates the classic block stacking game, Tetris. It also uses HTML5 Canvas to render the graphics of the game board onto the browser's DOM.

![](Metris.gif)

## Highlights

#### Game Logic

Game logic in Metris required createing a grid (represented by an array of arrays) and then filling that grid with pieces, then translating that grid into a pixel representation on the canvas. This required some complicated logic to make sure pieces stay on the board laterally, land correctly on the bottom or on top of other pieces, and rotate correctly. The function below represents just one of the game logic functions in Metris, but demonstrates how complicated they can become because of the different styles of pieces and the requirment that all scenarios be accounted for.

```
rotationCheck() {
    for (let i = 0; i < this.piece.squares.length; i++) {
      let x = this.piece.squares[i][0];
      let y = this.piece.squares[i][1];
      if (
        (this.piece.squares[i][0] === 0 && this.piece.rotations % 2 !== 0) ||
        (this.piece.squares[i][0] === 25 &&
          this.piece.rotations % 2 !== 0 &&
          this.piece.type === "I") ||
        (this.piece.squares[i][0] === 225 && this.piece.rotations % 2 !== 0) ||
        (this.piece.squares[i][0] === 200 &&
          this.piece.rotations % 2 !== 0 &&
          this.piece.type !== "T" &&
          this.piece.type !== "S" &&
          this.piece.type !== "Z" &&
          this.piece.type !== "J" &&
          this.piece.type !== "L") ||
        (this.grid[Math.ceil(y / 25) - 2][Math.ceil(x / 25) + 2] === "filled" &&
          this.piece.type !== "T" &&
          this.piece.type !== "S" &&
          this.piece.type !== "Z" &&
          this.piece.type !== "J" &&
          this.piece.type !== "L") ||
        this.grid[Math.ceil(y / 25) - 1][Math.ceil(x / 25) + 1] === "filled" ||
        this.grid[Math.ceil(y / 25) + 1][Math.ceil(x / 25) + 1] === "filled" ||
        this.grid[Math.ceil(y / 25) - 1][Math.ceil(x / 25) - 1] === "filled" ||
        (this.grid[Math.ceil(y / 25) + 2][Math.ceil(x / 25) - 2] === "filled" &&
          this.piece.type !== "T" &&
          this.piece.type !== "S" &&
          this.piece.type !== "Z" &&
          this.piece.type !== "J" &&
          this.piece.type !== "L") ||
        this.grid[Math.ceil(y / 25) + 1][Math.ceil(x / 25) - 1] === "filled"
      ) {
        return true;
      }
    }
  }
  ```

#### Rendering

Rendering the pieces to the canvas requires taking the location of the piece on the underlying grid and multiplying that index so that it appears properly on the canvas. Each piece has a squares property which represents the 4 "squares" that make up each Metris piece. Each time a piece is drawn, these squares are looped through and rendered onto the board

```
  draw(ctx) {
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.squares.length; i++) {
      ctx.fillRect(this.squares[i][0], this.squares[i][1], 25, 25);
    }
  }
  ```
  
  A seperate function loops through and adds a value to each square, which causes the pieces to fall through the canvas.
  
  ```
   down(ctx) {
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
  ```
  
Finally, in the Game class, the canvas is wiped clean and the board is re-rendered using ``requestAnimationFrame`` to create a smooth animation to the pieces.

```
 render(ctx) {
    if (this.board.gameOver === true) {
      this.ctx.clearRect(0, 0, 300, 600);
      this.ctx.fillStyle = "#1aff1a";
      this.ctx.fillText("GAME OVER", 68, 200);
      return;
    } else if (this.paused === false) {
      this.ctx.clearRect(0, 50, 300, 600);
      this.board.render(this.ctx);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}
```



## Thoughts and Future Development

In the future I would like to add a little more game logic to Metris. Specifically I'd like to set it up so that as a user accumulates points, the game would speed up and get more challenging.



