import { Game } from "@shared/game/core/Game";
import { create } from "zustand";
import { Position } from "@shared/game/core/Position";

interface GameStore {
  game: Game | null
  selectSquare: (position: Position) => void
  setGame: (game: Game) => void
}

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  selectSquare(position: Position) {
    set(state => {
      console.log("At useGame", state.game?.gameId);
      return ({
        game: state.game !== null ? state.game.selectSquare(position) : null
      })
    });
  },
  setGame(game: Game) {
    set(state => ({
      game: Game.clone(game)
    }))
  }
}))