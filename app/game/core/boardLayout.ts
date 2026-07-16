import { BoardCoordinate, ActivePlayer, PieceType } from "@game/types";

export const BOARD_ROWS = 9;
export const BOARD_COLS = 7;

export const RIVER_SQUARES: BoardCoordinate[] = [
  [3, 1], [3, 2], [3, 4], [3, 5],
  [4, 1], [4, 2], [4, 4], [4, 5],
  [5, 1], [5, 2], [5, 4], [5, 5],
];

export const DEN_BY_PLAYER: Record<ActivePlayer, BoardCoordinate> = {
  player1: [8, 3],
  player2: [0, 3],
};

export const TRAPS_BY_PLAYER: Record<ActivePlayer, BoardCoordinate[]> = {
  player1: [[8, 2], [7, 3], [8, 4]],
  player2: [[0, 2], [1, 3], [0, 4]],
}

export const INITIAL_PIECE_POSITIONS: Record<PieceType, BoardCoordinate[]> = {
  mouse: [[6, 6], [2, 0]],
  elephant: [[6, 0], [2, 6]],
  lion: [[8, 6], [0, 0]],
  tiger: [[8, 0], [0, 6]],
  leopard: [[6, 4], [2, 2]],
  wolf: [[6, 2], [2, 4]],
  dog: [[7, 5], [1, 1]],
  cat: [[7, 1], [1, 5]],
};

export const JUMP_MOVES_AT = {
  vertical: {
    top: [[2, 1], [2, 2], [2, 4], [2, 5]],
    bottom: [[6, 1], [6, 2], [6, 4], [6, 5]]
  },
  horizontal: {
    left: [[3, 0], [4, 0], [5, 0]],
    middle: [[3, 3], [4, 3], [5, 3]],
    right: [[3, 6], [4, 6], [5, 6]]
  }
} satisfies {
  vertical: Record<"top" | "bottom", BoardCoordinate[]>;
  horizontal: Record<"left" | "middle" | "right", BoardCoordinate[]>;
}
