import { Piece } from "./Piece";
import { PlayerNum } from "../core/Game";

export class Lion extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "lion";
  }

  canCapture(piece: Piece): boolean {
    return piece.type !== "elephant";
  }
} 