import { Square, SquareType } from "./Square";
import { PieceType } from "../pieces/Piece";
import { PieceFactory } from "../pieces/PieceFactory";
import { Position } from "./Position";

/** @description Board class controls board's squares, and pieces */
export class Board {
  // Board consits multiple squares
  public squares: Square[][];

  constructor() {
    // Initializes
    this.squares = Array.from({ length: NUM_ROW }, (_, rowIdx) => Array.from({ length: NUM_COL }, (_, colIdx) => new Square(new Position(rowIdx, colIdx,), null, "plain")));

    // Assign river, traps, and dens
    this.assignType(RIVERS, "river");
    this.assignType(TRAPS, "trap");
    this.assignType(DENS, "den");

    // Assign pieces
    this.assignPiece(MOUSES, "mouse");
    this.assignPiece(ELEPLANTS, "elephant");
    this.assignPiece(LIONS, "lion");
    this.assignPiece(TIGERS, "tiger");
    this.assignPiece(LEOPARDS, "leopard");
    this.assignPiece(DOGS, "dog");
    this.assignPiece(WOLFS, "wolf");
    this.assignPiece(CATS, "cat");
  }

  /**
   * Assign square's type to each positions
   * @param positions list of positions
   * @param type square's type
   */
  assignType(positions: number[][], type: SquareType) {
    positions.forEach((position) => {
      const [r, c] = position;
      this.squares[r][c].type = type;
    })
  }

  /**
   * Assign piece's type to each positions
   * @param positions list of positions
   * @param type piece's type
   */
  assignPiece(positions: number[][], type: PieceType) {
    positions.forEach((position, idx) => {
      const [r, c] = position;
      this.squares[r][c].piece = PieceFactory.create(type, idx == 0 ? 0 : 1);
    })
  }

  /**
   * Given board parameter, return new clone object
   * @param board board parameter
   * @returns new object cloning from the parameter
   */
  static clone(board: Board) {
    const newBoard = new Board();
    newBoard.squares = board.squares.map(row => row.map((square) => Square.clone(square)));

    return newBoard;
  }

  /**
   * Move piece from Position to Position
   * @param from intial position
   * @param to next position
   */
  move(from: Position, to: Position) {
    const [oldR, oldC, newR, newC] = [from.row, from.col, to.row, to.col];

    this.squares[newR][newC].piece = this.squares[oldR][oldC].piece;
    this.squares[oldR][oldC].piece = null;
  }
}

const NUM_ROW: number = 9;
const NUM_COL: number = 7;

// River's positions
const RIVERS: number[][] =
  [[3, 1], [3, 2], [3, 4], [3, 5],
  [4, 1], [4, 2], [4, 4], [4, 5],
  [5, 1], [5, 2], [5, 4], [5, 5],];

// Trap's positions
export const TRAPS: number[][] =
  [[8, 2], [7, 3], [8, 4],
  [0, 2], [1, 3], [0, 4]];

// Den's positions
export const DENS: number[][] =
  [[8, 3], [0, 3]];
// Mouse's positions
const MOUSES: number[][] =
  [[6, 6], [2, 0]];

// Elephant's positions
const ELEPLANTS: number[][] =
  [[6, 0], [2, 6]];

// Lion's positions
const LIONS: number[][] =
  [[8, 6], [0, 0]];

// Tiger's positions
const TIGERS: number[][] =
  [[8, 0], [0, 6]]

// Leopard's positions
const LEOPARDS: number[][] =
  [[6, 4], [2, 2]];

// Wolf's positions
const WOLFS: number[][] =
  [[6, 2], [2, 4]];

// Dog's positions
const DOGS: number[][] =
  [[7, 5], [1, 1]]

// Cat's coordiates
const CATS: number[][] =
  [[7, 1], [1, 5]]