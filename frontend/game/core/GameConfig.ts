import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";

export type PlayerNum = 1 | 2 | 3;
export type GameMode = "single" | "multi"

export interface GameConfig {
  board: Board;
  selectedSquare: Position | null;
  moveableSquares: Move[];
  player: PlayerNum;
  mode: GameMode;
  winner: PlayerNum | null;
  lastMove: Move | null
}

export const defaultGameConfig: GameConfig = {
  board: new Board(),
  selectedSquare: null,
  moveableSquares: [],
  player: 1,
  mode: "single",
  winner: null,
  lastMove: null
}