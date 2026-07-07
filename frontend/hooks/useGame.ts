import { create } from "zustand";
import { defaultGameConfig, GameConfig } from "@shared/game/core/GameConfig";

interface GameStore {
  gameConfig: GameConfig,
  gameId: string | null,
  setGameConfig: (gameConfig: GameConfig) => void,
  setGameId: (gameId: string | null) => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameConfig: defaultGameConfig,
  gameId: null,
  setGameConfig(gameConfig: GameConfig) {
    set({ gameConfig })
  },
  setGameId(gameId: string | null) {
    set({ gameId })
  }
}))