"use client";
import { GameConfig } from "@shared/game/core/GameConfig";
import Board from "./Board";
import { useGameStore } from "@/hooks/useGame";
import { useEffect } from "react";
import WinModal from "./modal/WinModal";
import { useGameChannel } from "@/hooks/useGameChannel";

export default function GameClient({ initialGame, gameId }: { initialGame: GameConfig; gameId: string }) {
  const game = useGameStore((state) => state.gameConfig);
  const setGameConfig = useGameStore((state) => state.setGameConfig);
  const subscribe = useGameChannel((s) => s.subscribe);
  const setGameId = useGameStore((s) => s.setGameId);

  useEffect(() => {
    setGameConfig(initialGame);
    subscribe(gameId);
    setGameId(gameId);
  }, [initialGame, setGameConfig, gameId]);

  // Check the game first
  return (
    <>
      {game !== null && game.winner !== null && <WinModal winner={game.winner} />}
      <Board board={(game ?? initialGame).board} />
    </>
  );
}
