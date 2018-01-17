# Metris

# Background 

Metris is based on the classic computer game Tetris. Pieces fall from the top of the board and the players goal is to create a complete line across of blocks across it. When the line is complete the player accumulates points and the line of blocks dissapears and the blocks above fall into place. As the game progresses the pseed at which the pieces fall increases makeing it more difficult for the player to find a correct space for the block. If the game board becomes filled the game ends. A varaiation that I'm considering including is different piece shapes.

# Functionality & MVP

-Start, pause and reset
-Rotate pieces clockwise and counter clockwise and move left and right
-Be able to see the next piece to fall
-Correct mechanics including full lines being accumulated into points and full boards causeing the game to end
-Easy to use game controls
-Good styling
-Links to my contact information
-Production ReadMe
-Bonus: Highscores

# Wireframe

 ![alt text](https://github.com/mszekalski/Metris/blob/master/Metris.png)
 
# Architecture and Technologies 

  -Javascript for logic <br />
  -HTML5 Canvas for styling <br />
  -CSS for styling <br />
  
  board.js <br />
   -Should hold all the logic for the board, including rendering and if a full line has been completed or if the game is over
   
  piece.js <br /> 
   -Holds logic for pieces including randomization, rotation, movement, appearance.  
   -May need seperate files for the different pieces.  
   
  game.js <br />
   -Game logic including score, resetting, pausing and starting <br />

# Implementation Timeline
  # Day 1
  
  # Day 2 
  
  # Day 3
  
  # Day 4
