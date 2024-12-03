import { useState } from "react";
import {
  transformBoard,
  boardCopy,
  markCellWithX,
  markCellWithQueen,
  unmarkCell,
} from "../utils/boardOperations";
import { validateBoard } from "../utils/boardValidations";

import {
  cell,
  borders,
  queenStates,
  Board,
  defaultBoard,
} from "../types/board";

interface Sizes {
  [key: number]: string;
}

export default function useBoard() {
  const sizes: Sizes = {
    5: "w-[20%]",
    6: "w-[16.666666666666668%]",
    7: "w-[14.285714285714286%]",
    8: "w-[12.5%]",
    9: "w-[11.11111111111111%]",
    10: "w-[10%]",
    11: "w-[9.090909090909092%]",
    12: "w-[8.333333333333334%]",
  };

  const [board, setBoard] = useState<Board>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [mark, setMark] = useState<queenStates>("x");

  const changeBoard = (board: defaultBoard) => {
    setBoard(transformBoard(board));
  };

  const handleBoard = (newBoard: Board) => {
    setBoard(newBoard);
  };

  const handlePressed = (pressed: boolean) => {
    setIsPressed(pressed);
  };

  const handleMark = (mark: queenStates) => {
    if (mark === "empty") {
      setMark("x");
      return;
    }
    if (mark === "x") {
      setMark("empty");
      return;
    }
  };

  const markCell = (data: { row: number; col: number }) => {
    const copy: Board = boardCopy(board);
    const currentCell = board[data.row][data.col];

    if (currentCell.state === "empty") {
      markCellWithX(handleBoard, copy, data.col, data.row);
      return;
    }

    if (currentCell.state === "x") {
      markCellWithQueen(handleBoard, copy, data.col, data.row);
      return;
    }
    unmarkCell(handleBoard, copy, data.col, data.row);
  };

  const multipleMark = (data: { row: number; col: number }) => {
    const copy = boardCopy(board);
    const isQueen = copy[data.row][data.col].state === "queen";

    if (isQueen) return;

    if (mark === "x") {
      markCellWithX(handleBoard, copy, data.col, data.row);
      return;
    }

    if (mark === "empty") {
      unmarkCell(handleBoard, copy, data.col, data.row);
      return;
    }
  };

  const isGameComplete = () => {
    const isValid = validateBoard(board);

    if (isValid && board[0][0].blocked === false) {
      const copy = boardCopy(board);

      copy.forEach((row: cell[]) => {
        row.forEach((cell) => {
          cell.blocked = true;
        });
      });

      setBoard(copy);
    }

    return isValid;
  };

  const getBorders = (row: number, col: number) => {
    const borders: borders = { bottom: false, right: false };
    const cell = board[row][col];

    const boardLength = board.length - 1;

    if (col < boardLength) {
      const rightCell = board[row][col + 1];
      if (cell.color !== rightCell.color) {
        borders.right = true;
      }
    }
    if (row < boardLength) {
      const bottomCell = board[row + 1][col];
      if (cell.color !== bottomCell.color) {
        borders.bottom = true;
      }
    }

    return borders;
  };

  return {
    board,
    changeBoard,
    markCell,
    multipleMark,
    isPressed,
    handleMark,
    handlePressed,
    isGameComplete,
    getBorders,
    sizes,
  };
}
