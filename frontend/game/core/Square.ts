import { Piece } from "../pieces/Piece";
import { Position } from "./Position";
import { TRAPS_BY_PLAYER } from "./boardLayout";
import { PlayerRole, SquareType } from "@game/types";

export class Square {
  public piece: Piece | null;
  public type: SquareType;
  public readonly position: Position;

  constructor(position: Position, piece: Piece | null, type: SquareType) {
    this.position = Position.clone(position);
    this.piece = piece;
    this.type = type;
  }

  static clone(square: Square): Square {
    return new Square(
      Position.clone(square.position),
      square.piece ? new Piece(square.piece.player, square.piece.type) : null,
      square.type
    );
  }

  /**
 * Returns the Manhattan distance from this square
 * to the specified position.
 * @param targetPosition position object
 * @returns integer
 */
  getDistanceToEnemyDen(targetPosition: Position): number {
    return Math.abs(targetPosition.row - this.position.row) + Math.abs(targetPosition.col - this.position.col);
  }

  /**
 * Returns whether this square is one of the opponent's traps.
 */
  isEnemyTrap(player: PlayerRole): boolean {
    const trapOwner = this.getTrapOwner();

    return trapOwner !== null && trapOwner !== player;
  }

  // -----------------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------------
  /**
 * Returns the owner of this trap.
 *
 * Returns null if this square is not a trap.
 */
  private getTrapOwner(): PlayerRole | null {
    if (this.type !== "trap") return null;

    const { row, col } = this.position;
    return TRAPS_BY_PLAYER.player1.some(([trapRow, trapCol]) => trapRow === row && trapCol === col) ? "player1" : "player2"
  }
}