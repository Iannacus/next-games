import { useState } from "react";

export default function useReset(): {
  resetBoard: boolean;
  onResetBoard: () => void;
  cancelReset: () => void;
} {
  const [resetBoard, setResetBoard] = useState(true);

  const onResetBoard = () => {
    setResetBoard(true);
  };

  const cancelReset = () => {
    setResetBoard(false);
  };

  return {
    resetBoard,
    onResetBoard,
    cancelReset,
  };
}
