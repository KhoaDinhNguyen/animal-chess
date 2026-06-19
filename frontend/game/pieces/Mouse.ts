import { PlayerNum } from "../core/Game";
import { Square } from "../core/Square";
import { Piece } from "./Piece";

export class Mouse extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "mouse";
  }

  canCapture(piece: Piece) {
    return piece.type == "elephant" || piece.type == "mouse";
  }
}