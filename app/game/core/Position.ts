export class Position {
  // Coordinates
  public row: number;
  public col: number;

  // Constructor
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  // Equal position
  equal(p: Position) {
    return this.row === p.row && this.col === p.col;
  }

  static clone(p: Position) {
    return new Position(p.row, p.col);
  }
}