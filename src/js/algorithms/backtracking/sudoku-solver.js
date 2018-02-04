const UNASSIGNED = 0;

/* Returns a boolean which indicates whether any assigned entry
   in the specified row matches the given number. */
function usedInRow(grid, row, num) {
  for (let col = 0; col < grid.length; col++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}
/* Returns a boolean which indicates whether any assigned entry
   in the specified column matches the given number. */
function usedInCol(grid, col, num) {
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}
/* Returns a boolean which indicates whether any assigned entry
      within the specified 3x3 box matches the given number. */
function usedInBox(grid, boxStartRow, boxStartCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

function isSafe(grid, row, col, num) {
  /* Check if 'num' is not already placed in current row,
            current column and current 3x3 box */
  return (
    !usedInRow(grid, row, num) &&
    !usedInCol(grid, col, num) &&
    !usedInBox(grid, row - (row % 3), col - (col % 3), num)
  );
}
function solveSudoku(grid) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;
  // If there is no unassigned location, we are done
  for (row = 0; row < grid.length; row++) {
    for (col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === UNASSIGNED) {
        checkBlankSpaces = true;
        break;
      }
    }
    if (checkBlankSpaces === true) {
      break;
    }
  }
  if (checkBlankSpaces === false) {
    return true;
  } // success!
  // consider digits 1 to 9
  for (let num = 1; num <= 9; num++) {
    // if looks promising
    if (isSafe(grid, row, col, num)) {
      // make tentative assignment
      grid[row][col] = num;
      // return, if success, yay!
      if (solveSudoku(grid)) {
        return true;
      }
      // failure, unmake & try again
      grid[row][col] = UNASSIGNED;
    }
  }
  return false;
}

export function sudokuSolver(grid) {
  if (solveSudoku(grid) === true) {
    return grid;
  }
  return 'NO SOLUTION EXISTS!';
}
