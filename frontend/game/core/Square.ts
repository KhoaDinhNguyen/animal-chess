import { Piece } from "../pieces/Piece";
import { Position } from "./Position";

export type SquareType = "plain" | "river" | "trap" | "den";

export class Square {
  public piece: Piece | null;
  public type: SquareType;
  public position: Position

  constructor(position: Position, piece: Piece | null, type: SquareType) {
    this.position = position;
    this.piece = piece;
    this.type = type;
  }

  static clone(square: Square): Square {
    return new Square(square.position, square.piece, square.type)
  }
}