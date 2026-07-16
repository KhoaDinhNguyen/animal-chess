import { Position } from "./Position";

export class Move {
  // Public variable
  public from: Position;
  public to: Position;
  public dr: number;
  public dc: number;

  // Constructor
  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;

    // dc = 1: left to right
    // dc = -1: right to left
    this.dc = from.col > to.col ? -1 : (from.col < to.col ? 1 : 0)

    // dr = 1: top to bottom
    // dr = -1: bottom to top
    this.dr = from.row > to.row ? -1 : (from.row < to.row ? 1 : 0)
  }

  static clone(m: Move) {
    return new Move(Position.clone(m.from), Position.clone(m.to));
  }
}