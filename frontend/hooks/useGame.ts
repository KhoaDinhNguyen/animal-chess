import { Game } from "@/game/core/Game";
import { create } from "zustand";
import { Position } from "@/game/core/Position";

interface GameStore {
  game: Game
  selectSquare: (position: Position) => void
  move: (from: Position, to: Position) => void
}

export const useGameStore = create<GameStore>((set) => ({
  game: new Game(),
  selectSquare(position: Position) {
    set(state => ({
      game: state.game.selectSquare(position)
    }));
  },
  move(from: Position, to: Position) {
    set(state => ({
      game: state.game.move(from, to)
    }))
  }
}))