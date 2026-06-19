import { Piece } from "./Piece";
import { PlayerNum } from "../core/Game";

export class Elephant extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "elephant";
  }

  canCapture(piece: Piece): boolean {
    return piece.type != "mouse";
  }
}