"use client";
import { Game } from "@shared/game/core/Game";
import Board from "./Board";
import { useGameStore } from "@/hooks/useGame";
import { useEffect, useRef } from "react";

export default function GameClient({ initialGame }: { initialGame: Game }) {
  const setGame = useGameStore((state) => state.setGame);

  // Preventing setting the store on every render
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    setGame(initialGame);
    initialized.current = true;
  }, [initialized, initialGame]);

  console.log(initialGame);
  return <Board board={initialGame.board} />;
}
