import { Game } from "@shared/game/core/Game";
import { create } from "zustand";
import { Position } from "@shared/game/core/Position";
import { defaultGameConfig, GameConfig } from "@shared/game/core/GameConfig";
import { supabase } from "@/lib/supabase";

interface GameStore {
  gameConfig: GameConfig,
  gameId: string | null,
  setGameConfig: (gameConfig: GameConfig) => void,
  setGameId: (gameId: string | null) => void
  selectSquare: (position: Position) => void
  unselectSquare: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameConfig: defaultGameConfig,
  gameId: null,
  setGameConfig(gameConfig: GameConfig) {
    set({ gameConfig })
  },
  setGameId(gameId: string | null) {
    set({ gameId })
  },

  // Select square
  selectSquare(position: Position) {
    const game = new Game(get().gameConfig);
    const newGame = game.selectSquare(position);

    set({ gameConfig: newGame.config })

  },

  // Unselect square
  unselectSquare() {
    const game = new Game(get().gameConfig);
    const newGame = game.unselectSquare();

    set({ gameConfig: newGame.config });
  },

}))