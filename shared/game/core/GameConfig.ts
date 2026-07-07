import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";

export type PlayerNum = 0 | 1 | 2;
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
  player: 0,
  mode: "single",
  winner: null,
  lastMove: null
}