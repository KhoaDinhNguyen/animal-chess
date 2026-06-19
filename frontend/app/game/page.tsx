"use client";

import Board from "@/components/Board";
import { useGameStore } from "@/hooks/useGame";

export default function PlayPage() {
  const game = useGameStore((state) => state.game);

  if (game == null) return <></>;

  return (
    <div>
      <Board board={game.board}></Board>
    </div>
  );
}
