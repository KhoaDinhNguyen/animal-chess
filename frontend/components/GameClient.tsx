"use client";
import Board from "./Board";
import { useGameStore } from "@/hooks/useGame";
import { useEffect, useState } from "react";
import WinModal from "./modal/WinModal";
import { useGameChannel } from "@/hooks/useGameChannel";
import { getOrCreateCookie } from "@/lib/cookies";
import { Game } from "@shared/game/core/Game";
import { assignRoleToGame } from "@/lib/database";

export const PLAYER_TOKEN = "player_token";

export default function GameClient({ gameData, gameId }: { gameData: any; gameId: string }) {
  const game = useGameStore((state) => state.gameConfig);
  const setGameConfig = useGameStore((state) => state.setGameConfig);
  const subscribe = useGameChannel((s) => s.subscribe);
  const setGameId = useGameStore((s) => s.setGameId);
  const [role, setRole] = useState<"player1" | "player2" | "spectator">("spectator");

  useEffect(() => {
    setGameConfig(Game.fromJSON(gameData));
    setGameId(gameId);
  }, [gameData, setGameConfig, gameId]);

  useEffect(() => {
    async function initToken() {
      let token = await getOrCreateCookie(PLAYER_TOKEN);
      const computedRole = await assignRoleToGame(gameId, token);
      setRole(computedRole);

      return [computedRole, token];
    }

    async function initGame() {
      const [role, token] = await initToken();
      subscribe(gameId, role, token);
    }

    initGame();
  }, [gameId]);

  // Check the game first
  return (
    <>
      {game !== null && game.winner !== null && <WinModal winner={game.winner} />}
      <Board board={(game ?? Game.fromJSON(gameData)).board} role={role} />
    </>
  );
}
