"use client";
import Board from "./Board";
import WinModal from "./modal/WinModal";
import { Game } from "@game/core/Game";
import { useGameInitialization } from "@/hooks/useGameInitialization";

export default function GameClient({ gameData, gameId }: { gameData: any; gameId: string }) {
  const [gameConfig, role] = useGameInitialization(gameData, gameId);
  const game = new Game(gameConfig ?? Game.fromJSON(gameData).config);

  // Check the game first
  return (
    <>
      {gameConfig !== null && gameConfig.winner !== null && <WinModal winner={gameConfig.winner} />}
      <Board board={game.board} role={role} />
    </>
  );
}
