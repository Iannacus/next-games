import { Board } from "../types/board";

export function queensInRow(board: Board, row: number) {
  let queens = 0;
  board[row].forEach((item) => {
    if (item.state === "queen") {
      queens++;
    }
  });
  return queens;
}

export function queensInCol(board: Board, row: number, col: number) {
  let queens = 0;
  board.forEach((item) => {
    if (item[col].state === "queen") {
      queens++;
    }
  });

  return queens;
}

export function queensInColor(
  board: Board,
  col: number,
  row: number,
  color: string
) {
  let queens = 0;

  board.forEach((item) => {
    item.forEach((cell) => {
      if (cell.color === color && cell.state === "queen") {
        queens++;
      }
    });
  });

  return queens;
}
