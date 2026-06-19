import { Position } from "./Position";

export class Move {
  // Public variable
  public from: Position;
  public to: Position;

  // Constructor
  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }
}