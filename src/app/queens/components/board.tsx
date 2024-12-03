"use client";

import { useEffect } from "react";
import Cell from "./cell";

import useBoard from "../hooks/useBoard";

import { defaultBoard } from "../types/board";
import useReset from "@/hooks/useReset";

interface GameBoardProps {
  board: defaultBoard;
  onComplete?: () => void;
}

export default function GameBoard({
  board,
  onComplete = () => {},
}: GameBoardProps) {
  const {
    board: gameBoard,
    changeBoard,
    markCell,
    multipleMark,
    isPressed,
    handlePressed,
    handleMark,
    isGameComplete,
    getBorders,
    sizes,
  } = useBoard();

  const { resetBoard, cancelReset: handleReset } = useReset();

  useEffect(() => {
    if (resetBoard) {
      changeBoard(board);
      handleReset();
    }
  }, [resetBoard]);

  useEffect(() => {
    if (isGameComplete()) {
      onComplete();
    }
  }, [gameBoard]);

  return (
    <div
      className="w-full"
      onMouseDown={() => handlePressed(true)}
      onMouseUp={() => handlePressed(false)}
      onMouseLeave={() => handlePressed(false)}
      onDrag={() => {
        if (isPressed) handlePressed(false);
      }}
    >
      {gameBoard.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <Cell
              key={j}
              cell={cell}
              size={sizes[gameBoard.length]}
              border={getBorders(i, j)}
              onDown={handleMark}
              onClick={() =>
                markCell({
                  row: cell.row,
                  col: cell.col,
                })
              }
              onMove={() => {
                if (!isPressed || cell.blocked) return;
                multipleMark({
                  row: cell.row,
                  col: cell.col,
                });
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
