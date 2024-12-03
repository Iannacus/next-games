import { Board } from "../types/board";
import {
  isDL,
  isDR,
  isUL,
  isUR,
  isSameColor,
  isSameCol,
  isSameRow,
  validateCorners,
  validateInvalidRows,
  validateInvalidCols,
  validateInvalidColors,
  xValidation,
} from "./boardValidations";
import { queensInCol, queensInColor, queensInRow } from "./queenCounters";

export function cleanCells(board: Board, row: number, col: number) {
  cleanRow(board, row, col);
  cleanCol(board, row, col);
  cleanColors(board, row, col);
  cleanCorners(board, row, col);
  cleanCell(board, row, col);

  validateInvalidRows(board);
  validateInvalidCols(board);
  validateInvalidColors(board);
  cleanX(board);
}

function cleanCell(board: Board, row: number, col: number) {
  board[row][col].isWrong = false;
}

function cleanRow(board: Board, row: number, col: number) {
  const crowns = queensInRow(board, row, col);
  board[row].forEach((item) => {
    if (crowns === 1) {
      item.invalid = false;
      if (item.state === "queen") {
        board[row][item.col].isWrong = false;
        isSameColor(board, item.col, row);
        isSameCol(board, item.col, row);
        validateCorners(board, item.col, row);
      }
    }
  });
}

function cleanCol(board: Board, row: number, col: number) {
  const crowns = queensInCol(board, row, col);

  board.forEach((rowItem) => {
    if (crowns === 1) {
      rowItem[col].invalid = false;
      rowItem[col].isWrong = false;
      if (rowItem[col].state === "queen") {
        isSameColor(board, col, rowItem[col].row);
        isSameRow(board, col, rowItem[col].row);
        validateCorners(board, col, rowItem[col].row);
      }
    }
  });
}

function cleanX(board: Board) {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.state === "x" && cell.method === "auto") {
        cell.state = "empty";
      }
    });
  });
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.state === "queen") {
        xValidation(board, cell.row, cell.col, cell.color);
      }
    });
  });
}

function cleanColors(board: Board, row: number, col: number) {
  const color = board[row][col].color;
  const crowns = queensInColor(board, col, row, color);
  board.forEach((item) => {
    item.forEach((cell) => {
      cell.invalid = false;
      if (crowns === 1 && cell.color === color && cell.state === "queen") {
        cell.isWrong = false;
        isSameRow(board, cell.col, cell.row);
        isSameCol(board, cell.col, cell.row);
        validateCorners(board, cell.col, cell.row);
      }
    });
  });
}

function cleanCorners(board: Board, row: number, col: number) {
  const len = board.length - 1;

  if (isUL(board, row, col)) {
    board[row - 1][col - 1].isWrong = false;
    board[row - 1][col - 1].invalid = false;
    board[row][col].invalid = false;
    isSameRow(board, col - 1, row - 1);
    isSameCol(board, col - 1, row - 1);
    isSameColor(board, col - 1, row - 1);
    validateCorners(board, col - 1, row - 1);
  }
  if (isUR(board, row, col, len)) {
    board[row - 1][col + 1].isWrong = false;
    board[row - 1][col + 1].invalid = false;
    board[row][col].invalid = false;
    isSameRow(board, col + 1, row - 1);
    isSameCol(board, col + 1, row - 1);
    isSameColor(board, col + 1, row - 1);
    validateCorners(board, col + 1, row - 1);
  }
  if (isDL(board, row, col, len)) {
    board[row + 1][col - 1].isWrong = false;
    board[row + 1][col - 1].invalid = false;
    board[row][col].invalid = false;
    isSameRow(board, col - 1, row + 1);
    isSameCol(board, col - 1, row + 1);
    isSameColor(board, col - 1, row + 1);
    validateCorners(board, col - 1, row + 1);
  }
  if (isDR(board, row, col, len)) {
    board[row + 1][col + 1].isWrong = false;
    board[row + 1][col + 1].invalid = false;
    board[row][col].invalid = false;
    isSameRow(board, col + 1, row + 1);
    isSameCol(board, col + 1, row + 1);
    isSameColor(board, col + 1, row + 1);
    validateCorners(board, col + 1, row + 1);
  }
}
