import { Square } from "./Square";
import { ActivePlayer, BoardCoordinate, PieceType, SquareType } from "@game/types"
import { Position } from "./Position";
import { Piece } from "../pieces/Piece";
import { INITIAL_PIECE_POSITIONS, BOARD_COLS, BOARD_ROWS, TRAPS_BY_PLAYER, RIVER_SQUARES, DEN_BY_PLAYER } from "./boardLayout"


/** Board class controls board's squares, and pieces */
export class Board {
  // -----------------------------------------------------------------------------
  // Fields
  // -----------------------------------------------------------------------------

  public squares: Square[][];

  // -----------------------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------------------
  constructor() {
    this.squares = this.createSquares();

    this.initializeTerrain();
    this.initializePieces();
  }

  // -----------------------------------------------------------------------------
  // Public
  // -----------------------------------------------------------------------------

  /**
 * Moves a piece to the destination square.
 * Any existing piece on the destination square is replaced.
 * @param from intial position
 * @param to next position
 */
  move(from: Position, to: Position) {
    const { row: fromRow, col: fromCol } = from;
    const { row: toRow, col: toCol } = to;

    this.squares[toRow][toCol].piece = this.squares[fromRow][fromCol].piece;
    this.squares[fromRow][fromCol].piece = null;
  }

  /**
   * Given board parameter, return new clone object
   * @param board board parameter
   * @returns new object cloning from the parameter
   */
  static clone(board: Board) {
    const cloned = new Board();

    cloned.squares = board.squares.map(row =>
      row.map(Square.clone)
    );

    return cloned;
  }

  // -----------------------------------------------------------------------------
  // Initialization
  // -----------------------------------------------------------------------------

  private createSquares(): Square[][] {
    return Array.from(
      { length: BOARD_ROWS },
      (_, row) =>
        Array.from(
          { length: BOARD_COLS },
          (_, col) =>
            new Square(new Position(row, col), null, "plain")));
  }

  private initializePieces() {
    for (const [type, positions] of Object.entries(INITIAL_PIECE_POSITIONS) as [PieceType, BoardCoordinate[]][]) {
      this.placePieces(type, positions);
    }
  }

  private initializeTerrain() {
    this.paintSquares(RIVER_SQUARES, "river");

    for (const traps of Object.values(TRAPS_BY_PLAYER)) {
      this.paintSquares(traps, "trap");
    }

    for (const den of Object.values(DEN_BY_PLAYER)) {
      this.paintSquares([den], "den");
    }
  }

  // -----------------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------------

  /**
 * Marks each specified square as the given terrain type (river, trap, or den)
 * @param positions list of positions 
 * @param type square's type
 */
  private paintSquares(positions: BoardCoordinate[], type: SquareType) {
    positions.forEach(([row, col]) => {
      this.squares[row][col].type = type;
    })
  }

  /**
   * Places the specified piece type for both players.
   * @param type piece's type
   * @param positions list of positions
   */
  private placePieces(type: PieceType, positions: BoardCoordinate[],) {
    positions.forEach(([row, col], index) => {
      const owner: ActivePlayer = index === 0 ? "player1" : "player2";
      this.squares[row][col].piece = new Piece(owner, type);
    })
  }
}