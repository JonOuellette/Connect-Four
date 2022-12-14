/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // board = Array(6).fill(0).map( () => Array(7));
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')
  // TODO: add comment for this code
  const top = document.createElement("tr");   //creates a table row elements and assigns the name of top
  top.setAttribute("id", "column-top");     // sets an id attribute of column-top to the tr element top that was created
  top.addEventListener("click", handleClick);   //sets a click event listener that will execute the handleClick function

  for (let x = 0; x < WIDTH; x++) {                 
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code            //the nested loop is used to creates the game board which is a 2 dimensional array
  for (let y = 0; y < HEIGHT; y++) {          //creates a loop that iterates up to the value of height
    const row = document.createElement("tr");   //createa table row element through each iteration of the loop and setting the value to row
    for (let x = 0; x < WIDTH; x++) {           // creates a nested loop that iterates up to the value of height
      const cell = document.createElement("td");     // creates table data element through each iteration and setting value to cell
      cell.setAttribute("id", `${y}-${x}`);         // sets an id attribute to the value of y-x for each table data element created
      row.append(cell);                             // appends the cell element
    }
    htmlBoard.append(row);                           //appends the row element
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let y = (HEIGHT - 1); y >= 0; y--){
    if(!board[y][x]) {
      return y
    } 
  }
  return null

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
 
  const cord = document.getElementById(`${y}-${x}`);
  cord.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
// this checks for each possible winning condition
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];   // loops through the array matrix to verify if there are 4 in a row horizontally
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];     // loops through the array matrix to verify if there are 4 in a row vertically
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];    //loops through the array matrix to verify if there are 4 in a row going in a right diagonal
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];    //loops through the array matrix to verify if there are 4 in a row going in a left diagonal

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
