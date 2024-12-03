export const colors: string[] = [
  "purple",
  "orange",
  "blue",
  "green",
  "grey",
  "pink",
  "aqua",
  "red",
  "yellow",
  "brown",
  "lime",
  "teal",
];

export const colorsDic: Color = {
  purple: "bg-purple-400",
  orange: "bg-orange-400",
  blue: "bg-blue-400",
  green: "bg-emerald-400",
  grey: "bg-slate-400",
  pink: "bg-pink-400",
  aqua: "bg-cyan-400",
  red: "bg-red-400",
  yellow: "bg-amber-400",
  brown: "bg-yellow-800",
  lime: "bg-lime-400",
  teal: "bg-teal-400",
};

type Color = {
  [key in QueenBoardColor]: string;
};

export type QueenBoardColor =
  | "purple"
  | "orange"
  | "blue"
  | "green"
  | "pink"
  | "grey"
  | "aqua"
  | "red"
  | "yellow"
  | "brown"
  | "lime"
  | "teal"
  | string;
