"use client";
import { useEffect, useState } from "react";
import { PlayerRole } from "@/game/core/types";
import { useGameStore } from "./useGame";
import { useGameChannel } from "./useGameChannel";
import { Game } from "@/game/core/Game";
import { getOrCreateCookie } from "@/lib/cookies";
import { assignRoleToGame } from "@/lib/database";
import { GameConfig } from "@/game/core/GameConfig";

export const PLAYER_TOKEN = "player_token";

export function useGameInitialization(gameData: any, gameId: string): [GameConfig, PlayerRole] {
  const { gameConfig, setGameConfig, setGameId } = useGameStore();
  const subscribe = useGameChannel((s) => s.subscribe);
  const [role, setRole] = useState<PlayerRole>("spectator");

  useEffect(() => {
    setGameConfig(Game.fromJSON(gameData).config);
    setGameId(gameId);
  }, [gameData, setGameConfig, gameId]);

  useEffect(() => {
    async function initializePlayer(): Promise<[PlayerRole, string]> {
      let token = await getOrCreateCookie(PLAYER_TOKEN);
      const computedRole = await assignRoleToGame(gameId, token);
      setRole(computedRole);

      return [computedRole, token];
    }

    async function initializeGameSession() {
      const [role, token] = await initializePlayer();
      subscribe(gameId, role, token);
    }

    initializeGameSession();
  }, [gameId, subscribe]);

  return [gameConfig, role];
}