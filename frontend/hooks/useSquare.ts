import { create } from "zustand"
import { Square } from "@/game/core/Square"

interface ChosenSquare {
  square: Square | null
  chooseSquare(newSquare: Square): void
}

export const useChosenSquareStore = create<ChosenSquare>((set) => ({
  square: null,
  chooseSquare(newSquare: Square) {
    set((state) => ({ square: newSquare }));
  }
}))