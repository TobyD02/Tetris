# Tetris
A Tetris clone made with pure javascript and html

## Running and Controls
Simple run the index.html file in a browser the start the game. The left and right arrow keys are used to shift pieces to the left and right. The spacebar is used to rotate them.

## Features
- Random tetris piece generation based on predefined models
- When a piece has finished moving, it is added to the board and solidified.
- When a line is made, the line is removed and the users score is updated
    - Points are calculated by how many lines are cleared:
    - 1 = 100 points
    - 2 = 200 points
    - 3 = 300 points
    - 4 (TETRIS) = 800 points
- Movement with arrow keys - movement is restricted to the confines of the board.
- Pieces can be rotated clockwise and counter-clockwise (only clockwise is used in the control scheme. The code for counter-clockwise rotation can be found in tetris.js in the rotate function).
- Game loss condition implemented - If pieces stack higher than the board, the user is presented a game over screen
- Pieces added to the board are assigned a colour. Green = Safe (closer to the bottom), Red = Unsafe (closer to the top). As pieces stack higher they begin to look more red.
