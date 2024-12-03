import { useState, useEffect, useRef } from "react";

interface Timer {
  timer: string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  pauseGame: () => void;
  isPaused: boolean;
}

const useTimer = (): Timer => {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameInterval, setGameInterval] = useState(true);
  const interval = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!gameInterval) return;
    if (interval.current) clearInterval(interval.current);

    interval.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [count, gameInterval]);

  const stopTimer = () => {
    clearInterval(interval.current);
    setGameInterval(false);
  };

  const startTimer = () => {
    setGameInterval(true);
  };

  const resetTimer = () => {
    setCount(0);
  };

  const pauseGame = () => {
    setGameInterval(!gameInterval);
    setIsPaused(!isPaused);
  };

  return {
    timer: sec2min(count),
    startTimer,
    stopTimer,
    resetTimer,
    pauseGame,
    isPaused,
  };
};

export default useTimer;

const sec2min = (sec = 0) => {
  const min = Math.trunc(sec / 60);
  const seconds = sec % 60;

  return `${format(min)} : ${format(seconds)}`;
};

const format = (value: number) => {
  if (value > 9) return value;

  return `0${value}`;
};
