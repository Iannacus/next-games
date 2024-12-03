import GameBoard from "../../components/board";
import { defaultBoard } from "../../types/board";
import { boards } from "../../utils/hard";

export default async function Page({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const slug = (await params).board;

  const board: defaultBoard = boards[Number(slug)];

  return (
    <div className="w-1/2 flex flex-col m-auto">
      <h1>Board: {slug}</h1>
      <GameBoard board={board} />
    </div>
  );
}
