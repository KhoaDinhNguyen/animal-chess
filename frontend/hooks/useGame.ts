import { Game } from "@shared/game/core/Game";
import { create } from "zustand";
import { Position } from "@shared/game/core/Position";

interface GameStore {
  game: Game | null
  selectSquare: (position: Position) => void
  setGame: (game: Game) => void
  unselectSquare: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  selectSquare(position: Position) {
    set(state => {
      return ({
        game: state.game !== null ? state.game.selectSquare(position) : null
      })
    });
  },
  setGame(game: Game) {
    set(state => ({
      game: Game.clone(game)
    }))
  },
  unselectSquare() {
    set(state => {
      console.log("unselect square at useGameStore", state.game?.unselectSquare());
      return ({
        game: state.game !== null ? state.game.unselectSquare() : null
      })
    })
  },
}))