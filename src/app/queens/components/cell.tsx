"use client";

import Mark from "../assets/mark";
import Queen from "../assets/queen";
import Diagonals from "../assets/diagonals";
import { colorsDic } from "../utils/colors";
import { borders, cell, queenStates } from "../types/board";

interface CellProps {
  cell: cell;
  size?: string;
  onClick?: () => void;
  onMove?: () => void;
  onDown?: (state: queenStates) => void;
  border?: borders;
}

export default function Cell({
  cell,
  size,
  onClick = () => {},
  onMove = () => {},
  onDown = () => {},
  border = { bottom: false, right: false },
}: CellProps) {
  const getBorder = (border: { bottom: boolean; right: boolean }) => {
    const borderStyle = ["border-b", "border-r"];
    const { bottom, right } = border;
    if (bottom) borderStyle[0] = "border-b-4";
    if (right) borderStyle[1] = "border-r-4";
    return borderStyle.join(" ");
  };

  return (
    <div
      className={`relative ${size || "w-[11.11%]"} aspect-square ${getBorder(
        border,
      )} border-slate-900 flex justify-center items-center ${
        colorsDic[cell.color]
      } ${cell.isWrong ? "text-red-500" : "text-slate-900"}`}
      onMouseDown={() => onDown(cell.state)}
      onClick={cell.blocked ? () => {} : () => onClick()}
      onMouseMove={onMove}
    >
      <div className={cell.state === "queen" ? "w-1/2" : "w-1/4"}>
        {cell.state === "queen" && (
          <Queen color={cell.isWrong ? "fill-red-600" : "fill-zinc-950"} />
        )}
        {cell.state === "x" && (
          <Mark color={cell.isWrong ? "fill-red-600" : "fill-zinc-950"} />
        )}
      </div>
      {cell.invalid && (
        <div className="absolute top-0 left-0 ">
          <Diagonals width="100%" color="stroke-red-600" />
        </div>
      )}
    </div>
  );
}
