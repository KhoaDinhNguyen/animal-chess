"use client";
import { Game } from "@shared/game/core/Game";
import Board from "./Board";
import { useGameStore } from "@/hooks/useGame";
import { useEffect } from "react";

export default function GameClient({ initialGame }: { initialGame: Game }) {
  const game = useGameStore((state) => state.game);
  const setGame = useGameStore((state) => state.setGame);

  useEffect(() => {
    setGame(initialGame);
  }, [initialGame, setGame]);

  // Check the game first
  return <Board board={(game ?? initialGame).board} />;
}
