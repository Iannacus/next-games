import { QueenBoardColor } from "../utils/colors";

export interface cell {
  color: QueenBoardColor;
  col: number;
  row: number;
  state: queenStates;
  isWrong: boolean;
  invalid: boolean;
  blocked: boolean;
  method: method;
}

export type Board = cell[][];

export type method = "auto" | "man" | "";

export type queenStates = "empty" | "x" | "queen";

export interface borders {
  bottom: boolean;
  right: boolean;
}

// default board

export interface defaultCell {
  color: QueenBoardColor;
  blocked: boolean;
}

export type defaultBoard = defaultCell[][];
