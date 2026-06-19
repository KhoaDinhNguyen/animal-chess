import { Position } from "../core/Position";
import { Piece } from "./Piece";
import { Game, PlayerNum } from "../core/Game";
import { Square } from "../core/Square";

export class Elephant extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "elephant";
  }

  canCapture(piece: Piece): boolean {
    return piece.type != "mouse";
  }

  canMoveRiver(square: Square, player: PlayerNum): boolean {
    return false;
  }
}