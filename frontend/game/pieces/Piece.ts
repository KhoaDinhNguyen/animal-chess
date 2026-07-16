import { Game } from "../core/Game";
import { Position } from "../core/Position";
import { Square } from "../core/Square";
import { TRAPS_BY_PLAYER, DEN_BY_PLAYER, BOARD_COLS, BOARD_ROWS, JUMP_MOVES_AT } from "../core/boardLayout";
import { Move } from "../core/Move";
import { PlayerRole, PieceType, BoardCoordinate } from "@game/types"

const PIECE_RANKS: Record<PieceType, number> = {
  mouse: 1,
  cat: 2,
  dog: 3,
  wolf: 4,
  leopard: 5,
  tiger: 6,
  lion: 7,
  elephant: 8
}

export class Piece {
  public type: PieceType;
  public player: PlayerRole;
  public rank: number;

  constructor(player: PlayerRole, type: PieceType) {
    this.player = player;
    this.type = type;
    this.rank = PIECE_RANKS[type];
  }

  /**
   * Shows avaiable moves for an piece
   * @param game current game state
   * @param position current position
   * @returns array Move object
   */
  getLegalMoves(game: Game, position: Position): Move[] {
    const moves = this.getAdjacentMoves(game, position);

    moves.push(...this.getJumpMoves(game, position));

    return moves;
  }


  // -----------------------------------------------------------------------------
  // Movements rule
  // -----------------------------------------------------------------------------

  /**
   * Every animals have the same plain moves
   * @param currentSquare the current sit square
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a plain
   */
  private canEnterPlain(currentSquare: Square, targetSquare: Square, player: PlayerRole): boolean {
    if (targetSquare.type !== "plain") return false;
    if (targetSquare.piece == null) return true;
    if (targetSquare.piece.player == player) return false;
    if (currentSquare.type === "river" && targetSquare.piece.type === "elephant") return false;

    return this.canCapture(targetSquare.piece);
  }
  /**
   * Determines whether this piece may enter the opponent's den.
   */
  private canEnterDen(targetSquare: Square, player: PlayerRole): boolean {
    if (targetSquare.type !== "den") return false;

    return this.getDenOwner(targetSquare) !== player; // Animals can only enter opponent's den
  }

  /**
   * Determines whether this piece may enter the target trap.
   *
   * Friendly pieces cannot be entered. Enemy pieces may be
   * captured according to the trap rules.
   */
  private canEnterTrap(targetSquare: Square, player: PlayerRole): boolean {
    if (targetSquare.type !== "trap") return false;
    else if (targetSquare.piece == null) return true; // If the trap is empty, any animals can enter it
    else if (targetSquare.piece.player == player) return false; // If the trap is occupied by allies, can not enter

    // If the trap is nonempty, then a trap must be from the current player or it can capture the animal inside the trap
    return this.canCapture(targetSquare.piece) || this.getTrapOwner(targetSquare) == player;
  }

  /**
   * Only mouse can move to river
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a river
   */
  private canEnterRiver(targetSquare: Square, player: PlayerRole): boolean {
    if (targetSquare.type != "river") return false;
    if (this.type !== "mouse") return false;
    if (targetSquare.piece == null) return true; // If the river is empty, enter it

    return false;
  }

  /**
 * Determines whether this piece can capture the given piece.
 *
 * Special rule:
 * - Mouse can capture elephant.
 * - Elephant cannot capture mouse.
 */
  private canCapture(piece: Piece) {
    if (this.rank === 1 && piece.rank === 8) return true;
    if (this.rank === 8 && piece.rank === 1) return false;

    return this.rank >= piece.rank;
  }

  private canEnterSquare(currentSquare: Square, targetSquare: Square, player: PlayerRole): boolean {
    switch (targetSquare.type) {
      case "plain": return this.canEnterPlain(currentSquare, targetSquare, player);
      case "river": return this.canEnterRiver(targetSquare, player);
      case "trap": return this.canEnterTrap(targetSquare, player);
      case "den": return this.canEnterDen(targetSquare, player);
      default: return false;
    }
  }

  // -----------------------------------------------------------------------------
  // Movement generation
  // -----------------------------------------------------------------------------

  private getAdjacentMoves(game: Game, position: Position): Move[] {
    const { row, col } = position;
    const currentSquare = game.board.squares[row][col];

    const moves: Move[] = [];

    for (const [dRow, dCol] of Piece.DIRECTIONS) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;

      if (!this.isInsideBoard(nextRow, nextCol)) continue;

      const targetSquare = game.board.squares[nextRow][nextCol];
      const destination = new Position(nextRow, nextCol);

      // Check if the next square is movable to den, trap, river, and plain
      if (this.canEnterSquare(currentSquare, targetSquare, game.currentTurnPlayer)) moves.push(new Move(position, destination));
    }

    return moves;
  }

  private getJumpMoves(game: Game, position: Position): Move[] {
    if (this.type !== "lion" && this.type !== "tiger") return [];

    const { row, col } = position;
    const moves: Move[] = [];
    const squares = game.board.squares;

    // For each direction, check movable squares
    for (const [dRow, dCol] of this.getJumpDirections(position)) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;
      if (!this.isInsideBoard(nextRow, nextCol)) continue;

      // A mouse in the river blocks the jump
      const destination = new Position(nextRow, nextCol);
      if (this.hasMouseInRiver(game, position, destination)) continue;

      // Target square
      const targetSquare = squares[nextRow][nextCol];

      if (!this.canLandOnPlain(targetSquare, game.currentTurnPlayer)) continue;

      moves.push(new Move(position, destination))

    }
    return moves;
  }

  // -----------------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------------

  private getJumpDirections(position: Position): BoardCoordinate[] {
    if (this.isIn(JUMP_MOVES_AT.vertical.top, position)) return [[4, 0]];
    if (this.isIn(JUMP_MOVES_AT.vertical.bottom, position)) return [[-4, 0]];
    if (this.isIn(JUMP_MOVES_AT.horizontal.left, position)) return [[0, 3]];
    if (this.isIn(JUMP_MOVES_AT.horizontal.middle, position)) return [[0, 3], [0, -3]];
    if (this.isIn(JUMP_MOVES_AT.horizontal.right, position)) return [[0, -3]];

    return [];
  }

  /**
 * Returns whether a mouse occupies any river square between
 * the start and destination of a jump.
 *
 * A mouse in the river blocks lion and tiger jumps.
 */
  private hasMouseInRiver(game: Game, from: Position, to: Position) {
    const squares = game.board.squares;
    const isVertical = from.col === to.col;

    const { row: fromRow, col: fromCol } = from;
    const { row: toRow, col: toCol } = to;

    const [start, end] = isVertical ? [fromRow, toRow] : [fromCol, toCol];
    const step = Math.sign(end - start);

    // A mouse in the river blocks the jump
    for (let i = start + step; i !== end; i += step) {
      const targetSquare = isVertical ? squares[i][toCol] : squares[toRow][i];

      if (targetSquare.piece?.type === "mouse") return true;
    }

    return false;
  }

  /**
   * Return true if an animal (tiger or lion) can jump across by landing on different plain
   * Three conditions:
   * - If the plain is empty, then it can go
   * - If the plain is occupied by friendly piece, it cannot land
   * - Otherwise (plain is occupied by opponent piece), it must have higher rank
   */
  private canLandOnPlain(targetSquare: Square, player: PlayerRole): boolean {
    // If the plain is empty, then animal can land
    if (!targetSquare.piece) return true;

    // If the plain is not empty and the target animal is from current player
    if (targetSquare.piece.player === player) return false;

    return this.canCapture(targetSquare.piece);
  }

  private isIn(positions: BoardCoordinate[], position: Position): boolean {
    const { row, col } = position;

    return positions.some(([r, c]) => r === row && col === c);
  }

  private isInsideBoard(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < BOARD_ROWS &&
      col >= 0 &&
      col < BOARD_COLS
    );
  }

  private getDenOwner(square: Square): PlayerRole {
    const { row, col } = square.position;

    return DEN_BY_PLAYER.player1[0] === row && DEN_BY_PLAYER.player1[1] === col ? "player1" : "player2";
  }

  private getTrapOwner(square: Square): PlayerRole {
    const { row, col } = square.position;

    return TRAPS_BY_PLAYER.player1.some(([trapRow, trapCol]) => trapRow === row && trapCol === col) ? "player1" : "player2"
  }

  private static readonly DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ] as const;
}