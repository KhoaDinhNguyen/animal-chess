import { Piece } from "../pieces/Piece";
// import { PieceFactory } from "../pieces/PieceFactory";
import { Position } from "./Position";
import { TRAPS } from "./Board";
import { PlayerNum } from "./GameConfig";

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

    return new Square(Position.clone(square.position), new Piece(square.piece.player, square.piece.type), square.type);
  }

  /**
 * Get Manhattan distance from current position
 * @param targetPosition position object
 * @returns integer
 */
  getDistanceToEnemyDen(targetPosition: Position): number {
    return Math.abs(targetPosition.row - this.position.row) + Math.abs(targetPosition.col - this.position.col);
  }

  isEnemyTrap(player: PlayerNum): boolean {
    if (this.type !== "trap") return false;

    const enemyTrap = player === 1 ? [...TRAPS.slice(0, 3)] : [...TRAPS.slice(-3)];

    return enemyTrap.some(trap => (trap[0] === this.position.row && trap[1] === this.position.col));
  }

  isOwnTrap(player: PlayerNum): boolean {
    if (this.type !== "trap") return false;

    const ownTrap = player === 0 ? [...TRAPS.slice(0, 3)] : [...TRAPS.slice(-3)];

    return ownTrap.some(trap => (trap[0] === this.position.row && trap[1] === this.position.col));
  }
}