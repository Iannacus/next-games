import { Board } from "../types/board";
import { QueenBoardColor } from "./colors";

export function makeCellInvalid(board: Board, col: number, row: number) {
  board[row][col].invalid = true;
}

export function makeRowInvalid(board: Board, row: number) {
  board[row].forEach((item) => {
    item.invalid = true;
  });
}

export function makeColInvalid(board: Board, col: number) {
  board.forEach((rowItem) => {
    rowItem[col].invalid = true;
  });
}

export function makeColorInvalid(
  board: Board,
  color: QueenBoardColor | string
) {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.color === color) {
        cell.invalid = true;
      }
    });
  });
}
