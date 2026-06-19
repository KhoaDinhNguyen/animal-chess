import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Tiger extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "tiger";
  }

  canCapture(piece: Piece): boolean {
    return piece.type !== "elephant" && piece.type !== "lion";
  }
}