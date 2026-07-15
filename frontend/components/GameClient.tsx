"use client";
import Board from "./Board";
import { useGameStore } from "@/hooks/useGame";
import { useEffect, useState } from "react";
import WinModal from "./modal/WinModal";
import { useGameChannel } from "@/hooks/useGameChannel";
import { getOrCreateCookie } from "@/lib/cookies";
import { Game } from "@game/core/Game";
import { assignRoleToGame } from "@/lib/database";
import { PlayerRole } from "@game/types";

export const PLAYER_TOKEN = "player_token";

export default function GameClient({ gameData, gameId }: { gameData: any; gameId: string }) {
  const gameConfig = useGameStore((state) => state.gameConfig);
  const setGameConfig = useGameStore((state) => state.setGameConfig);
  const subscribe = useGameChannel((s) => s.subscribe);
  const setGameId = useGameStore((s) => s.setGameId);
  const [role, setRole] = useState<PlayerRole>("spectator");

  useEffect(() => {
    setGameConfig(Game.fromJSON(gameData));
    setGameId(gameId);
  }, [gameData, setGameConfig, gameId]);

  useEffect(() => {
    async function initToken(): Promise<[PlayerRole, string]> {
      let token = await getOrCreateCookie(PLAYER_TOKEN);
      const computedRole = await assignRoleToGame(gameId, token);
      console.log(computedRole);
      console.log(gameConfig);
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
      {gameConfig !== null && gameConfig.winner !== null && <WinModal winner={gameConfig.winner} />}
      <Board board={(gameConfig ?? Game.fromJSON(gameData)).board} role={role} />
    </>
  );
}
