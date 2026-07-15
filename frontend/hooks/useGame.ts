import { create } from "zustand";
import { defaultGameConfig, GameConfig } from "@game/core/GameConfig";

// ---- Type & Interface
interface GameStore {
  gameConfig: GameConfig,
  gameId: string | null,
  setGameConfig: (gameConfig: GameConfig) => void,
  setGameId: (gameId: string | null) => void,
}

// ---- Zustand's function
export const useGameStore = create<GameStore>((set) => ({
  gameConfig: defaultGameConfig,
  gameId: null,
  setGameConfig(gameConfig: GameConfig) {
    set({ gameConfig })
  },
  setGameId(gameId: string | null) {
    set({ gameId })
  },
}))