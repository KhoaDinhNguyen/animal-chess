import { Piece } from "../pieces/Piece";
import { PieceFactory } from "../pieces/PieceFactory";
import { Position } from "./Position";

export type SquareType = "plain" | "river" | "trap" | "den";

export class Square {
  public piece: Piece | null;
  public type: SquareType;
  public position: Position;

  constructor(position: Position, piece: Piece | null, type: SquareType) {
    this.position = Position.clone(position);
    this.piece = piece;
    this.type = type;
  }

  static clone(square: Square): Square {
    if (square.piece == null) return new Square(square.position, null, square.type);

    return new Square(Position.clone(square.position), PieceFactory.create(square.piece?.type, square.piece?.player), square.type);
  }
}