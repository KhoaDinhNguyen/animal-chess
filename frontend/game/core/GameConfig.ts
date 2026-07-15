import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";
import { PlayerRole, GameMode } from "@game/types"

export interface GameConfig {
  board: Board;
  selectedSquare: Position | null;
  moveableSquares: Move[];
  currentTurnPlayer: PlayerRole;
  mode: GameMode;
  winner: PlayerRole | null;
  lastMove: Move | null
}

export const defaultGameConfig: GameConfig = {
  board: new Board(),
  selectedSquare: null,
  moveableSquares: [],
  currentTurnPlayer: "player1",
  mode: "single",
  winner: null,
  lastMove: null
}