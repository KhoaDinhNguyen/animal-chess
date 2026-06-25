import { PlayerNum } from "../core/Game";
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