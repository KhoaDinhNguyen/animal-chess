import { Square, SquareType } from "./Square";
import { PieceType } from "../pieces/Piece";
import { PieceFactory } from "../pieces/PieceFactory";
import { Position } from "./Position";

const NUM_ROW: number = 9
const NUM_COL: number = 7
const RIVERS: number[][] =
  [[3, 1], [3, 2], [3, 4], [3, 5],
  [4, 1], [4, 2], [4, 4], [4, 5],
  [5, 1], [5, 2], [5, 4], [5, 5],]

const TRAPS: number[][] =
  [[8, 2], [7, 3], [8, 4],
  [0, 2], [1, 3], [0, 4]]

const DENS: number[][] =
  [[0, 3], [8, 3]]

const MOUSES: number[][] =
  [[2, 0], [6, 6]]

export class Board {
  public squares: Square[][];

  constructor() {
    // Initializes
    this.squares = Array.from({ length: NUM_ROW }, (_, rowIdx) => Array.from({ length: NUM_COL }, (_, colIdx) => new Square(new Position(rowIdx, colIdx), null, "plain")));

    // Assign river, traps, and dens
    this.assignType(RIVERS, "river");
    this.assignType(TRAPS, "trap");
    this.assignType(DENS, "den");

    // Assign pieces
    this.assignPiece(MOUSES, "mouse");

  }

  assignType(positions: number[][], type: SquareType) {
    positions.forEach(position => {
      const [r, c] = position;
      this.squares[r][c].type = type;
    })
  }

  assignPiece(positions: number[][], type: PieceType) {
    positions.forEach((position, idx) => {
      const [r, c] = position;
      const color = idx == 0 ? "red" : "blue";
      this.squares[r][c].piece = PieceFactory.create(type, color);
    })
  }

  static clone(board: Board) {
    const newBoard = new Board();
    newBoard.squares = board.squares.map(row => row.map((square) => Square.clone(square)));

    return newBoard;
  }

  move(from: Position, to: Position) {
    const [oldR, oldC, newR, newC] = [from.row, from.col, to.row, to.col];

    this.squares[newR][newC].piece = this.squares[oldR][oldC].piece;
    this.squares[oldR][oldC].piece = null;
  }
}