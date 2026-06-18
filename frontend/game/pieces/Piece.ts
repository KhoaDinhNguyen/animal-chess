import { Board } from "../core/Board";
import { Position } from "../core/Position";

export type PieceType = "mouse"

export abstract class Piece {
  public color: string;
  public type: PieceType;

  constructor(color: string) {
    this.color = color;
    this.type = "mouse";
  }

  abstract showMoves(board: Board, position: Position): Position[];
}